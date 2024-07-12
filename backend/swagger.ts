class Swagger {
    SetSwagger(){
        const swaggerJSDoc = require('swagger-jsdoc');

        const swaggerDefinition = {
            openapi: '3.0.0',
            info: {
                title: 'API PROJECT',
                version: '1.0.0',
                description:
                    'API PROJECT',
            },
            servers: [
                {
                    url: 'http://localhost:5001/v1/api-docs',
                    description: 'Development server',
                },
            ],
        };

        const options = {
            swaggerDefinition,
            // Paths to files containing OpenAPI definitions
            apis: ['./src/routes/*.ts'],
        };

        const swaggerSpec = swaggerJSDoc(options);

        return swaggerSpec
    }
}

export default Swagger;

