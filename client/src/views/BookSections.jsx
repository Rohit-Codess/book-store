import React from 'react';
import DealsSection from '../sections/DealsSection';
import PreOrdersSection from '../sections/PreOrdersSection';
import NewArrivalsSection from '../sections/NewArrivalsSection';
import FictionSection from '../sections/FictionSection';
import YoungAdultSection from '../sections/YoungAdultSection';
import ChildrenSection from '../sections/ChildrenSection';

const BookSections = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* All Book Sections */}
        <DealsSection />
        <PreOrdersSection />
        <NewArrivalsSection />
        <FictionSection />
        <YoungAdultSection />
        <ChildrenSection />
      </div>
    </section>
  );
};

export default BookSections;
