import ExpenseList from "../components/ExpenseList";
import { useParams } from "react-router-dom";

const ExpenseListPage = () => {
    const { budgetId } = useParams<{ budgetId: string }>();
    return (
        <div className="container mx-auto py-8">
            <ExpenseList  budgetId={budgetId}  />
        </div>
    );
};

export default ExpenseListPage;
