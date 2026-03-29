import {
  Form,
  Link,
  useActionData,
  useMatches,
  useParams,
  useNavigation,
} from "react-router";

function SupplyForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData();
  const params = useParams();
  const matches = useMatches();
  const supplies = matches.find((match) => match.id === "routes/supplies");
  const supplyData = supplies.find((supply) => supply.id === params.id);
  const navigation = useNavigation();

  const defaultValues = supplyData
    ? {
        supplyType: supplyData.supplyType,
        amount: supplyData.amount,
        units: supplyData.units,
        description: supplyData.description,
        date: supplyData.createdAt,
        location: supplyData.location,
      }
    : {
        supplyType: "",
        amount: "",
        units: "",
        description: "",
        date: "",
        location,
      };

  const isSubmitting = navigation.state !== "idle";

  return (
    <Form
      method={supplyData ? "patch" : "post"}
      className="form"
      id="expense-form"
    >
      <p>
        <label htmlFor="supplyType">Supply Type</label>
        <input
          type="type"
          id="supplyType"
          name="supplyType"
          required
          maxLength={30}
          defaultValue={defaultValues.supplyType}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              defaultValues.date ? defaultValues.date.slice(0, 10) : ""
            }
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default SupplyForm;
