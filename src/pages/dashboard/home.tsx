import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { ComboboxDemo } from "@/components/ui/combobox";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSummaryTransactionsMonth,
  getUserData,
  getCategories,
  getModalities,
  getGoals,
  createTransaction,
} from "../../services/api";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ITransaction {
  amount: number;
  category: string;
  date: string;
  dueDate: string;
  groupInstallmentId: string;
  id: number;
  installment: number;
  isExpense: number;
  modality: string;
  transaction: string;
  transactionStatus: string;
}

interface ICategory {
  id: number;
  name: string;
}

interface IModality {
  id: number;
  name: string;
}

interface IGoal {
  id: number;
  name: string;
}

const date = new Date();
const year = date.getFullYear();
const months = [
  { value: `${year}-01`, label: "Janeiro" },
  { value: `${year}-02`, label: "Fevereiro" },
  { value: `${year}-03`, label: "Março" },
  { value: `${year}-04`, label: "Abril" },
  { value: `${year}-05`, label: "Maio" },
  { value: `${year}-06`, label: "Junho" },
  { value: `${year}-07`, label: "Julho" },
  { value: `${year}-08`, label: "Agosto" },
  { value: `${year}-09`, label: "Setembro" },
  { value: `${year}-10`, label: "Outubro" },
  { value: `${year}-11`, label: "Novembro" },
  { value: `${year}-12`, label: "Dezembro" },
];

export function DashboardHome() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [currentSelectType, setCurrentSelectType] = useState<
    "category" | "modality" | "goal" | null
  >(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [modalities, setModalities] = useState<IModality[]>([]);
  const [goals, setGoals] = useState<IGoal[]>([]);
  const [formData, setFormData] = useState({
    transaction: "",
    installments: 0,
    date: new Date().toISOString().split("T")[0],
    amount: "",
    categoryId: 0,
    modalityId: 0,
    goalId: 0,
    isExpense: 1,
  });

  const formatCurrency = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, "");

    // Converte para número e divide por 100 para considerar os centavos
    const amount = Number(numericValue) / 100;

    // Formata o valor como moeda brasileira
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "amount") {
      // Remove formatação para armazenar apenas números
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else if (name === "installments") {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? Number(value) : 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const dataToSend = {
        ...formData,
        amount: Number(formData.amount) / 100,
        goalId: formData.goalId || null,
      };

      const response = await createTransaction(token, dataToSend);

      if (response) {
        setIsModalOpen(false);
        setFormData({
          transaction: "",
          installments: 0,
          date: "",
          amount: "",
          categoryId: 0,
          modalityId: 0,
          goalId: 0,
          isExpense: 1,
        });
        // Recarregar os dados
        const summaryResponse = await getSummaryTransactionsMonth(
          token,
          selectedMonth
        );
        setSummary({
          totalIncome: summaryResponse.data.calculatedSums.totalIncome,
          totalExpenses: summaryResponse.data.calculatedSums.totalExpenses,
          balance: summaryResponse.data.calculatedSums.available,
          transactions: summaryResponse.data.transactions,
        });
      }
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
    }
  };

  function getCurrentMonth() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  }

  const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonth());

  const [user, setUser] = useState<{
    id: number;
    fullName: string;
    email: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [summary, setSummary] = useState<{
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    transactions: ITransaction[];
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const [categoriesRes, modalitiesRes, goalsRes] = await Promise.all([
          getCategories(token),
          getModalities(token),
          getGoals(token),
        ]);

        // Acessar os dados dentro da propriedade data da resposta
        const categoriesData = Array.isArray(categoriesRes.data)
          ? categoriesRes.data
          : [];
        const modalitiesData = Array.isArray(modalitiesRes.data)
          ? modalitiesRes.data
          : [];
        const goalsData = Array.isArray(goalsRes.data) ? goalsRes.data : [];

        setCategories(categoriesData);
        setModalities(modalitiesData);
        setGoals(goalsData);
      } catch {
        // Em caso de erro, garantir que os estados sejam arrays vazios
        setCategories([]);
        setModalities([]);
        setGoals([]);
      }
    };

    fetchData();
  }, [navigate, formData.categoryId, formData.modalityId, formData.goalId]);

  const handleSelectClick = (type: "category" | "modality" | "goal") => {
    setCurrentSelectType(type);
    setIsSelectModalOpen(true);
  };

  const handleSelectItem = (id: number) => {
    if (currentSelectType) {
      const fieldName =
        currentSelectType === "goal" ? "goalId" : `${currentSelectType}Id`;

      // Se estiver selecionando uma meta, força isExpense para 0 (receita)
      if (currentSelectType === "goal") {
        setFormData((prev) => ({
          ...prev,
          [fieldName]: id,
          isExpense: 0,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [fieldName]: id,
        }));
      }
    }
    setIsSelectModalOpen(false);
  };

  const handleTypeChange = (type: number) => {
    // Se estiver mudando para despesa (1), remove a meta
    if (type === 1) {
      setFormData((prev) => ({
        ...prev,
        isExpense: type,
        goalId: 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        isExpense: type,
      }));
    }
  };

  const getSelectedName = (type: "category" | "modality" | "goal") => {
    let id: number;
    switch (type) {
      case "category":
        id = formData.categoryId;
        break;
      case "modality":
        id = formData.modalityId;
        break;
      case "goal":
        id = formData.goalId;
        break;
    }
    const list =
      type === "category"
        ? categories
        : type === "modality"
        ? modalities
        : goals;
    const item = list.find((item) => item.id === id);
    return item
      ? item.name
      : `Selecione ${
          type === "category"
            ? "uma categoria"
            : type === "modality"
            ? "uma modalidade"
            : "uma meta"
        }`;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    getUserData(token)
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
    getSummaryTransactionsMonth(token, selectedMonth)
      .then((resp) => {
        setSummary({
          totalIncome: resp.data.calculatedSums.totalIncome,
          totalExpenses: resp.data.calculatedSums.totalExpenses,
          balance: resp.data.calculatedSums.available,
          transactions: resp.data.transactions,
        });
      })
      .catch((err) => setError(err.message));
  }, [navigate, selectedMonth]);

  if (error) return <p>Erro: {error}</p>;
  if (!user || !summary) return <p>Carregando...</p>;

  return (
    <>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 ml-auto mr-4">
            <ComboboxDemo
              data={months}
              placeholder="Mês"
              setDefault={getCurrentMonth()}
              onChange={setSelectedMonth}
              className="w-[120px]"
            />
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <PlusIcon className="h-4 w-4" />
                  Lançamento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nova Transação</DialogTitle>
                  <DialogDescription>
                    Preencha os campos abaixo para adicionar uma nova transação.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Input
                        id="amount"
                        type="text"
                        name="amount"
                        value={
                          formData.amount ? formatCurrency(formData.amount) : ""
                        }
                        onChange={handleInputChange}
                        className="col-span-4"
                        placeholder="R$ 0,00"
                        aria-label="Valor da transação"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Input
                        id="transaction"
                        name="transaction"
                        value={formData.transaction}
                        onChange={handleInputChange}
                        className="col-span-4"
                        placeholder="Digite a descrição"
                        aria-label="Descrição da transação"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="col-span-4 flex gap-2">
                        <Button
                          type="button"
                          variant={
                            formData.isExpense === 1 ? "default" : "outline"
                          }
                          className="flex-1"
                          onClick={() => handleTypeChange(1)}
                          disabled={formData.goalId !== 0}
                        >
                          Despesa
                        </Button>
                        <Button
                          type="button"
                          variant={
                            formData.isExpense === 0 ? "default" : "outline"
                          }
                          className="flex-1"
                          onClick={() => handleTypeChange(0)}
                        >
                          Receita
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Button
                        id="category"
                        type="button"
                        variant="outline"
                        className="col-span-4 justify-between"
                        onClick={() => handleSelectClick("category")}
                      >
                        {getSelectedName("category")}
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Button
                        id="modality"
                        type="button"
                        variant="outline"
                        className="col-span-4 justify-between"
                        onClick={() => handleSelectClick("modality")}
                      >
                        {getSelectedName("modality")}
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Button
                        id="goal"
                        type="button"
                        variant="outline"
                        className="col-span-4 justify-between"
                        onClick={() => handleSelectClick("goal")}
                        disabled={formData.isExpense === 1}
                      >
                        {getSelectedName("goal")}
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Input
                        id="installments"
                        type="number"
                        name="installments"
                        value={formData.installments || ""}
                        onChange={handleInputChange}
                        className="col-span-4"
                        placeholder="N° Parcelas"
                        aria-label="Número de parcelas"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Input
                        id="date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="col-span-4"
                        aria-label="Data da transação"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">Salvar</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className="aspect-video rounded-xl bg-muted/50">
              <Card
                title="Receitas"
                content={summary.totalIncome}
                category="income"
              />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50">
              <Card
                title="Despesas"
                content={summary.totalExpenses}
                category="expense"
              />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50">
              <Card
                title="Saldo Mês"
                content={summary.balance}
                category="available"
              />
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {/* <ChartComponent data={} /> */}
          </div>
        </div>

        <Dialog open={isSelectModalOpen} onOpenChange={setIsSelectModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {currentSelectType === "category"
                  ? "Selecione uma categoria"
                  : currentSelectType === "modality"
                  ? "Selecione uma modalidade"
                  : "Selecione uma meta"}
              </DialogTitle>
              <DialogDescription>
                {currentSelectType === "category"
                  ? "Escolha uma categoria para a transação"
                  : currentSelectType === "modality"
                  ? "Escolha uma modalidade para a transação"
                  : "Escolha uma meta para a transação"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-4">
              {(currentSelectType === "category"
                ? categories
                : currentSelectType === "modality"
                ? modalities
                : goals
              ).map((item) => (
                <Button
                  key={item.id}
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleSelectItem(item.id)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </>
  );
}
