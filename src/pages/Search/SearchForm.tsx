import Button from '../../components/Forms/Button';
import Input from '../../components/Forms/Input';

type SearchFormProps = {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSearchButton: () => void;
  formClassName: string;
  search: string;
  disabled: boolean;
};

function SearchForm({
  handleKeyDown,
  handleSearch,
  handleSearchButton,
  search,
  disabled,
  formClassName }: SearchFormProps) {
  return (
    <form id="search-form" className={ formClassName }>

      <div id="input-search-container" className="position-relative">
        <Input
          id="search-artist-input"
          type="text"
          testId="search-artist-input"
          placeholder="Nome do artista"
          onChange={ handleSearch }
          enterClick={ handleKeyDown }
          value={ search }
        />
        <i className="bi bi-search text-primary " />
      </div>

      <Button
        testId="search-artist-button"
        type="button"
        disabled={ disabled }
        containerClassName=""
        btnClassName="primary-btn"
        onClick={ handleSearchButton }
      >
        Procurar
      </Button>

    </form>
  );
}

export default SearchForm;
