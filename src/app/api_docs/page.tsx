'use client'
import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import "swagger-ui-react/swagger-ui.css"
import swaggerFile from './api_spec.json';

// export default function SwaggerPage(){
//   return (
//     <div>
//       <SwaggerUI spec={swaggerFile} />
//     </div>
//   );
// };

import dynamic from "next/dynamic";

const DynamicSwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => <p>Loading Component...</p>,
});

const AdminDocPage = () => {
  return <DynamicSwaggerUI spec={swaggerFile} />;
};

export default AdminDocPage;