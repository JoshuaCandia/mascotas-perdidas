import React from 'react';

const HomeDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>Detalles de Home</h1>
      <p>ID: {params.id}</p>
    </div>
  );
};

export default HomeDetailsPage;
