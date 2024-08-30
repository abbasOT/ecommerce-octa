import Medusa from "@medusajs/medusa-js";

const medusa = new Medusa({ baseUrl: "https://circuithub.pk", maxRetries: 3 });

export default medusa;
