'use client'
import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import "swagger-ui-react/swagger-ui.css"
import swaggerFile from './api_spec.json';

export default function SwaggerPage(){
  return (
    <div>
      <SwaggerUI spec={swaggerFile} />
    </div>
  );
};