import { PropTypes } from "prop-types";

export function CustomSelect({ handleFilterChange }) {
  const handleChange = (e) => {
    const selectedOption = e.target.value;
    handleFilterChange(selectedOption);
  };

  const selectOptions = [
    { id: 1, name: "Any Price" },
    {
      id: 2,
      name: "Up to $15",
    },
    { id: 3, name: "$15-$30" },
    { id: 4, name: "$30+" },
  ];

  return (
    <div className="book__select">
      <select
        onChange={handleChange}
        type="select"
        name="price"
        id="select"
      >
        {selectOptions.map((option) => (
          <option key={option.id}>{option.name}</option>
        ))}
      </select>
    </div>
  );
}

CustomSelect.propTypes = {
  handleFilterChange: PropTypes.func,
};
