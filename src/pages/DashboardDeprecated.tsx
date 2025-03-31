import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSummaryTransactionsMonth, getUserData } from "../services/api";

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

// interface ITransactionsGrouped {
//   amount: number;
//   category: string;
// }

export function DashboardDeprecated() {
  const navigate = useNavigate();

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

  const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonth());

  const date = new Date();
  const year = date.getFullYear();
  const months = [
    { label: "Janeiro", value: `${year}-01` },
    { label: "Fevereiro", value: `${year}-02` },
    { label: "Março", value: `${year}-03` },
    { label: "Abril", value: `${year}-04` },
    { label: "Maio", value: `${year}-05` },
    { label: "Junho", value: `${year}-06` },
    { label: "Julho", value: `${year}-07` },
    { label: "Agosto", value: `${year}-08` },
    { label: "Setembro", value: `${year}-09` },
    { label: "Outubro", value: `${year}-10` },
    { label: "Novembro", value: `${year}-11` },
    { label: "Dezembro", value: `${year}-12` },
  ];
  function getCurrentMonth() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  }

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

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  if (error) return <p>Erro: {error}</p>;
  if (!user || !summary) return <p>Carregando...</p>;

  // const groupedTransactions: ITransactionsGrouped[] =
  //   summary.transactions.reduce((acc: ITransactionsGrouped[], value) => {
  //     const sumValue = value.isExpense == 1 ? value.amount * (-1) : value.amount
  //     const category = acc.find(category => category.category == value.category)
  //     if(category) {
  //       category.amount += sumValue
  //     } else {
  //       acc.push({
  //         category: value.category,
  //         amount: value.amount
  //       })
  //     }
  //     return acc;
  //   }, [] as ITransactionsGrouped[]);

  return (
    <>
      {/* <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Bem-vindo, {user.fullName}!</h1>
            <div className={styles.options}>
              <div className={styles.month}>
                <select
                  id="month-dropdown"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>
              <Button text="Lançamento" />
            </div>
          </div>
          <div className={styles.summary}>
            <div className={styles.cards}>
              <Card
                title="Entradas"
                content={summary.totalIncome}
                category="income"
              />
              <Card
                title="Saídas"
                content={summary.totalExpenses}
                category="expense"
              />
              <Card
                title="Saldo"
                content={summary.balance}
                category="available"
              />
            </div>
            <div className={styles.graphSummary}>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
