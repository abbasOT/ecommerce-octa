import Medusa from "@medusajs/medusa-js";

const medusa = new Medusa({ baseUrl: "https://admin.circuithub.pk", maxRetries: 3 });



// const medusa = new Medusa({ baseUrl: "https://localhost:9000", maxRetries: 3 });

export default medusa;
