export default function Input({type, name, id, placeholder, isrequired, data, setData}) {
  return (
    <input
    type={type}
    name={name}
    id={id}
    placeholder={placeholder}
    value={data[name] || ''}
    onChange={(e) => {
      const newValue = e.target.value;
      setData((prevData) => ({
        ...prevData, [name]: newValue
      }))
    }}
    required={isrequired}
    />
  )
}