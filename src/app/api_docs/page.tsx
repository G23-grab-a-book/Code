'use client'
import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import "swagger-ui-react/swagger-ui.css"
import swaggerFile from './api_spec.json';

const SwaggerPage = () => {
  return (
    <div>
      <SwaggerUI spec={swaggerFile} />
    </div>
  );
};

export default SwaggerPage;
