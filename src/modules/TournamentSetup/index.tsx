import { LoadingLogo } from "@components/ui/LoadingLogo";
import { useTournamentForm } from "./hooks/useTournamentForm";
import { InputName } from "./components/form-config/InputName";
import { SelectType } from "./components/form-config/SelectType";
import { AccordionCharacters } from "./components/form-config/AccordionCharacters";
import { InputCategories } from "./components/form-config/InputCategories";

export const TournamentSetup = () => {
  const {
    formConfig,
    characters,
    categories,
    handleChangeForm,
    handleAddCharacter,
    handleAddGroupCard,
    handleAddCategory,
    handleChangeCategory,
    handleStartTorunament,
    disabledAdd,
    disabledSubmit,
    loading,
  } = useTournamentForm();

  if (loading) return <LoadingLogo />;

  return (
    <div className="fade-in flex flex-col items-center h-screen max-w-screen ">
      <div className="my-10">
        <h1 className="text-5xl">GENSHIN ROYAL RUMBLE </h1>
      </div>
      <form
        className="flex flex-col items-center justify-center max-w-6xl min-w-3xl rounded-lg p-4 gap-4"
        onSubmit={handleStartTorunament}
      >
        {/* NAME */}
        <InputName value={formConfig.name} onChange={handleChangeForm} />
        {/* TYPE */}
        <SelectType value={formConfig.type} onChange={handleChangeForm} />
        {/* CATEGORIES */}
        <InputCategories
          categories={categories}
          disabledAdd={disabledAdd}
          handleAddCategory={handleAddCategory}
          handleChangeCategory={handleChangeCategory}
        />
        {/* CHARACTERS */}
        <AccordionCharacters
          formCharacters={formConfig.characters}
          characters={characters}
          handleAddGroupCard={handleAddGroupCard}
          handleAddCharacter={handleAddCharacter}
        />
        <button
          type="submit"
          disabled={disabledSubmit} // tu lógica aquí
          className="w-full max-w-xs px-6 py-2 bg-gray-700 text-white font-semibold rounded-xl shadow-md transition duration-200 ease-in-out active:scale-95 cursor-pointer
                     hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
        >
          Create Tournament
        </button>
      </form>
    </div>
  );
};
