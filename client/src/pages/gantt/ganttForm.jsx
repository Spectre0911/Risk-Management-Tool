import { useFormik } from "formik";
import { Button } from "react-bootstrap";

const GanttForm = ({ handleClose, addFeature }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        start: "",
        end: "",
        dependencies: "",
      },
      onSubmit: (values) => {
        addFeature(values);
      },
    });

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="name">Name</label>
      <input
        value={values.name}
        onChange={handleChange}
        id="name"
        type="string"
        placeholder="Feature name"
        onBlur={handleBlur}
      />
      <label htmlFor="name">Start Date</label>
      <input
        value={values.email}
        onChange={handleChange}
        id="start"
        type="date"
        placeholder="Feature start date"
        onBlur={handleBlur}
      />
      <label htmlFor="end">End Date</label>
      <input
        value={values.end}
        onChange={handleChange}
        id="end"
        type="date"
        placeholder="Feature end date"
        onBlur={handleBlur}
      />
      <label htmlFor="dependencies">Dependencies</label>
      <input
        value={values.dependencies}
        onChange={handleChange}
        id="dependencies"
        type="string"
        placeholder="Dependencies"
        onBlur={handleBlur}
      />
      <button type="submit">Submit</button>
      <Button
        onClick={handleClose}
        sx={{
          m: "2rem 0",
          p: "1rem",
        }}
      >
        {"Cancel"}
      </Button>
    </form>
  );
};
export default GanttForm;
