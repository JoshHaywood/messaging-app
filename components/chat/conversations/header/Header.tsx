import SearchBar from "@/components/chat/conversations/header/SearchBar";
import AddContact from "@/components/chat/conversations/header/AddContact";

export default function Header(props: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleChange: React.Dispatch<React.ChangeEvent<HTMLInputElement>>;
}) {
  const { searchTerm, setSearchTerm, handleChange } = props;

  return (
    <div className="flex flex-row items-center space-x-2.5">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleChange={handleChange}
      />

      <AddContact />
    </div>
  );
}
