import { memo } from "react";
import NEW from "@assets/images/icons/new.svg?react";
import DELETE from "@assets/images/icons/xmark.svg?react";
import { FormCheck } from "@components/form/FormCheck";
import { FormInput } from "@components/form/FormInput";
import { nativeCategories } from "@modules/TournamentSetup/variables/SetupVariables";
import { FormSelect } from "@components/form/FormSelect";
import { useTournamentStoreForm } from "../../hooks/useTournamentStoreForm";

export const CategoriesSlide = memo(() => {
  const { categories, disabledAdd, handleChangeCategory, handleAddCategory, handleDeleteCategory } =
    useTournamentStoreForm();

  return (
    <div className="flex flex-col items-center gap-10 mb-5 text-center justify-center h-full animate-fade-in px-8">
      <h3 className="text-4xl font-semibold text-white">NOW CHOOSE THE EVALUATION CATEGORIES</h3>
      <p className="leading-loose text-lg max-w-3xl text-gray-300 ">
        Now, choose how matches will be evaluated in your tournament.
        <span className="text-amber-400"> Each method offers distinct rules and strategic depth</span>, so pick the one
        that best matches your vision for the competition!
      </p>
      <div>
        <div className="flex gap-4 mb-2">
          <span className="w-[calc(65px)] text-center">Native</span>
          <span className="flex-1">Name</span>
          <span className="w-[140px]">Weight</span>
        </div>
        {categories.map((category, index) => (
          <div key={category.id} className="flex items-center gap-4 mb-4">
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
                className="p-2.5"
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
              sizeClass="w-[70px]"
              className="p-2.5"
              value={categories[index].weight}
              onChange={(e) => handleChangeCategory(e, index)}
              required
            />
            {index !== 0 && (
              <DELETE className="w-4 h-4 fill-amber-500 cursor-pointer" onClick={() => handleDeleteCategory(index)} />
            )}
          </div>
        ))}
      </div>
      <NEW
        className={`w-6 h-6 p-1 rounded-full shadow-md transition-transform duration-200 mt-0${
          disabledAdd
            ? "fill-gray-300 cursor-not-allowed opacity-50"
            : "fill-amber-500 hover:bg-amber-500 cursor-pointer hover:scale-110"
        }`}
        onClick={!disabledAdd ? handleAddCategory : undefined}
      />
    </div>
  );
});
