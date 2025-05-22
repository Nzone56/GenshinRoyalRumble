import { memo } from "react";
import NEW from "@assets/images/icons/new.svg";
import { FormCheck } from "@components/form/FormCheck";
import { FormInput } from "@components/form/FormInput";
import { nativeCategories } from "@modules/TournamentSetup/variables/SetupVariables";
import { FormSelect } from "@components/form/FormSelect";
import { useTournamentStoreForm } from "../../hooks/useTournamentStoreForm";

export const CategoriesSlide = memo(() => {
  const { categories, disabledAdd, handleChangeCategory, handleAddCategory } = useTournamentStoreForm();

  return (
    <div className="flex flex-col items-center mb-5">
      <h3 className="mb-2 text-3xl">Categories</h3>
      <div>
        <div className="flex gap-4 mb-2">
          <span className="w-[calc(65px)] text-center">Native</span>
          <span className="flex-1">Name</span>
          <span className="w-[100px]">Weight</span>
        </div>
        {categories.map((category, index) => (
          <div key={category.id} className="flex gap-4 mb-4">
            <FormCheck
              id={`tournament_category_${category.id}_native`}
              name={`native`}
              className="mx-4"
              checked={categories[index].native}
              onChange={(e) => handleChangeCategory(e, index)}
            />
            {/* TODO: RETHINK ABOUT THE NATIVE VALUES  */}
            {categories[index].native ? (
              <FormSelect
                id="tournament_type"
                name="type"
                value={categories[index].name}
                onChange={(e) => handleChangeCategory(e, index)}
              >
                {nativeCategories.map((category) => (
                  <option id={category} key={category} value={category} disabled>
                    {category}
                  </option>
                ))}
              </FormSelect>
            ) : (
              <FormInput
                id={`tournament_category_${category.id}_name`}
                name={`name`}
                value={categories[index].name}
                placeholder=""
                onChange={(e) => handleChangeCategory(e, index)}
                required
              />
            )}
            {/* TODO: CREATE A CHECK THAT MAKES EVERY WIEGHT VALUE 10  */}
            <FormInput
              id={`tournament_category_${category.id}_weight`}
              name={`weight`}
              type="number"
              min="0"
              max="10"
              step="0.1"
              sizeClass="w-[100px]"
              className=""
              value={categories[index].weight}
              placeholder=""
              onChange={(e) => handleChangeCategory(e, index)}
              required
            />
          </div>
        ))}
      </div>
      <img
        src={NEW}
        alt="Agregar categoría"
        className={`w-6 h-6 p-1 rounded-full shadow-md transition-transform duration-200 ${
          disabledAdd
            ? "bg-gray-400 cursor-not-allowed opacity-50"
            : "bg-gray-700 hover:bg-gray-800 cursor-pointer hover:scale-110"
        }`}
        onClick={!disabledAdd ? handleAddCategory : undefined}
      />
    </div>
  );
});
