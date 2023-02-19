import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import { basicSchema } from "./validation";

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
        console.log(errors);
        console.log("logged");
        addFeature(values);
      },
      validationSchema: basicSchema,
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
        className={errors.name ? "input-error" : ""}
      />
      <label htmlFor="start">Start Date</label>
      <input
        value={values.start}
        onChange={handleChange}
        id="start"
        type="date"
        placeholder="Feature start date"
        onBlur={handleBlur}
        className={errors.start ? "input-error" : ""}
      />
      <label htmlFor="end">End Date</label>
      <input
        value={values.end}
        onChange={handleChange}
        id="end"
        type="date"
        placeholder="Feature end date"
        onBlur={handleBlur}
        className={errors.end ? "input-error" : ""}
      />
      <label htmlFor="dependencies">Dependencies</label>
      <input
        value={values.dependencies}
        onChange={handleChange}
        id="dependencies"
        type="string"
        placeholder="Dependencies"
        onBlur={handleBlur}
        className={errors.end ? "input-error" : ""}
      />
      <button type="submit" onClick={() => console.log(errors)}>
        Submit
      </button>
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
