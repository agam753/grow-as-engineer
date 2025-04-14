const FormTextArea: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ label, name, value, onChange }) => {
  return (
    <div className="mt-4">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
};

export default FormTextArea;
