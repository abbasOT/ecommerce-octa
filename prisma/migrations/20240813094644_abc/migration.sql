-- AddForeignKey
ALTER TABLE "tax_rate" ADD CONSTRAINT "FK_b95a1e03b051993d208366cb960" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
