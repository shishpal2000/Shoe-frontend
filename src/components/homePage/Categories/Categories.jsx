import style from "../../../styles/categories.module.css";
import CategoriesCard from "../CategoriesCard/CategoriesCard";
import SectionTittle from "../SectionTittle/SectionTittle";

const Categories = () => {
  return (
    <>
      <div className={style.categories_main}>
        <SectionTittle secTittle="categories" />
        <div className="container">
          <div className={`${style.categories_items}`}>
            <CategoriesCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
