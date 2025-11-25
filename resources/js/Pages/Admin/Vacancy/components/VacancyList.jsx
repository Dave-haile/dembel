import React from "react";
import VacancyItem from "./VacancyItem";

const VacancyList = ({ vacancies = [], isClosingSoon, onView, onEdit, onDelete }) => {
  return (
    <>
      {vacancies.length > 0 ? (
        vacancies.map((vacancy) => (
          <VacancyItem
            key={vacancy.id}
            vacancy={vacancy}
            isClosingSoon={isClosingSoon}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">No vacancies found</div>
      )}
    </>
  );
};

export default VacancyList;
