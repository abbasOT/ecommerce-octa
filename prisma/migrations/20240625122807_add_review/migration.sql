-- CreateEnum
CREATE TYPE "PAYMENT_COLLECTION_STATUS_ENUM" AS ENUM ('not_paid', 'awaiting', 'authorized', 'partially_authorized', 'canceled');

-- CreateEnum
CREATE TYPE "PAYMENT_COLLECTION_TYPE_ENUM" AS ENUM ('order_edit');

-- CreateEnum
CREATE TYPE "cart_type_enum" AS ENUM ('default', 'swap', 'draft_order', 'payment_link', 'claim');

-- CreateEnum
CREATE TYPE "claim_item_reason_enum" AS ENUM ('missing_item', 'wrong_item', 'production_failure', 'other');

-- CreateEnum
CREATE TYPE "claim_order_fulfillment_status_enum" AS ENUM ('not_fulfilled', 'partially_fulfilled', 'fulfilled', 'partially_shipped', 'shipped', 'partially_returned', 'returned', 'canceled', 'requires_action');

-- CreateEnum
CREATE TYPE "claim_order_payment_status_enum" AS ENUM ('na', 'not_refunded', 'refunded');

-- CreateEnum
CREATE TYPE "claim_order_type_enum" AS ENUM ('refund', 'replace');

-- CreateEnum
CREATE TYPE "discount_condition_operator_enum" AS ENUM ('in', 'not_in');

-- CreateEnum
CREATE TYPE "discount_condition_type_enum" AS ENUM ('products', 'product_types', 'product_collections', 'product_tags', 'customer_groups');

-- CreateEnum
CREATE TYPE "discount_rule_allocation_enum" AS ENUM ('total', 'item');

-- CreateEnum
CREATE TYPE "discount_rule_type_enum" AS ENUM ('fixed', 'percentage', 'free_shipping');

-- CreateEnum
CREATE TYPE "draft_order_status_enum" AS ENUM ('open', 'completed');

-- CreateEnum
CREATE TYPE "invite_role_enum" AS ENUM ('admin', 'member', 'developer');

-- CreateEnum
CREATE TYPE "order_fulfillment_status_enum" AS ENUM ('not_fulfilled', 'partially_fulfilled', 'fulfilled', 'partially_shipped', 'shipped', 'partially_returned', 'returned', 'canceled', 'requires_action');

-- CreateEnum
CREATE TYPE "order_item_change_type_enum" AS ENUM ('item_add', 'item_remove', 'item_update');

-- CreateEnum
CREATE TYPE "order_payment_status_enum" AS ENUM ('not_paid', 'awaiting', 'captured', 'partially_refunded', 'refunded', 'canceled', 'requires_action');

-- CreateEnum
CREATE TYPE "order_status_enum" AS ENUM ('pending', 'completed', 'archived', 'canceled', 'requires_action');

-- CreateEnum
CREATE TYPE "payment_session_status_enum" AS ENUM ('authorized', 'pending', 'requires_more', 'error', 'canceled');

-- CreateEnum
CREATE TYPE "price_list_status_enum" AS ENUM ('active', 'draft');

-- CreateEnum
CREATE TYPE "price_list_type_enum" AS ENUM ('sale', 'override');

-- CreateEnum
CREATE TYPE "product_status_enum" AS ENUM ('draft', 'proposed', 'published', 'rejected');

-- CreateEnum
CREATE TYPE "refund_reason_enum" AS ENUM ('discount', 'return', 'swap', 'claim', 'other');

-- CreateEnum
CREATE TYPE "return_status_enum" AS ENUM ('requested', 'received', 'requires_action', 'canceled');

-- CreateEnum
CREATE TYPE "shipping_option_price_type_enum" AS ENUM ('flat_rate', 'calculated');

-- CreateEnum
CREATE TYPE "shipping_option_requirement_type_enum" AS ENUM ('min_subtotal', 'max_subtotal');

-- CreateEnum
CREATE TYPE "shipping_profile_type_enum" AS ENUM ('default', 'gift_card', 'custom');

-- CreateEnum
CREATE TYPE "swap_fulfillment_status_enum" AS ENUM ('not_fulfilled', 'fulfilled', 'shipped', 'partially_shipped', 'canceled', 'requires_action');

-- CreateEnum
CREATE TYPE "swap_payment_status_enum" AS ENUM ('not_paid', 'awaiting', 'captured', 'confirmed', 'canceled', 'difference_refunded', 'partially_refunded', 'refunded', 'requires_action');

-- CreateEnum
CREATE TYPE "user_role_enum" AS ENUM ('admin', 'member', 'developer');

-- CreateTable
CREATE TABLE "address" (
    "id" VARCHAR NOT NULL,
    "customer_id" VARCHAR,
    "company" VARCHAR,
    "first_name" VARCHAR,
    "last_name" VARCHAR,
    "address_1" VARCHAR,
    "address_2" VARCHAR,
    "city" VARCHAR,
    "country_code" VARCHAR,
    "province" VARCHAR,
    "postal_code" VARCHAR,
    "phone" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics_config" (
    "id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "user_id" VARCHAR NOT NULL,
    "opt_out" BOOLEAN NOT NULL DEFAULT false,
    "anonymize" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_93505647c5d7cb479becb810b0f" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batch_job" (
    "id" VARCHAR NOT NULL,
    "type" TEXT NOT NULL,
    "created_by" VARCHAR,
    "context" JSONB,
    "result" JSONB,
    "dry_run" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pre_processed_at" TIMESTAMPTZ(6),
    "confirmed_at" TIMESTAMPTZ(6),
    "processing_at" TIMESTAMPTZ(6),
    "completed_at" TIMESTAMPTZ(6),
    "failed_at" TIMESTAMPTZ(6),
    "canceled_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "PK_e57f84d485145d5be96bc6d871e" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" VARCHAR NOT NULL,
    "email" VARCHAR,
    "billing_address_id" VARCHAR,
    "shipping_address_id" VARCHAR,
    "region_id" VARCHAR NOT NULL,
    "customer_id" VARCHAR,
    "payment_id" VARCHAR,
    "type" "cart_type_enum" NOT NULL DEFAULT 'default',
    "completed_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "idempotency_key" VARCHAR,
    "context" JSONB,
    "payment_authorized_at" TIMESTAMPTZ(6),
    "sales_channel_id" VARCHAR,

    CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_discounts" (
    "cart_id" VARCHAR NOT NULL,
    "discount_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_10bd412c9071ccc0cf555afd9bb" PRIMARY KEY ("cart_id","discount_id")
);

-- CreateTable
CREATE TABLE "cart_gift_cards" (
    "cart_id" VARCHAR NOT NULL,
    "gift_card_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_2389be82bf0ef3635e2014c9ef1" PRIMARY KEY ("cart_id","gift_card_id")
);

-- CreateTable
CREATE TABLE "claim_image" (
    "id" VARCHAR NOT NULL,
    "claim_item_id" VARCHAR NOT NULL,
    "url" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_7c49e44bfe8840ca7d917890101" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claim_item" (
    "id" VARCHAR NOT NULL,
    "claim_order_id" VARCHAR NOT NULL,
    "item_id" VARCHAR NOT NULL,
    "variant_id" VARCHAR NOT NULL,
    "reason" "claim_item_reason_enum" NOT NULL,
    "note" VARCHAR,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_5679662039bc4c7c6bc7fa1be2d" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claim_item_tags" (
    "item_id" VARCHAR NOT NULL,
    "tag_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_54ab8ce0f7e99167068188fbd81" PRIMARY KEY ("item_id","tag_id")
);

-- CreateTable
CREATE TABLE "claim_order" (
    "id" VARCHAR NOT NULL,
    "payment_status" "claim_order_payment_status_enum" NOT NULL DEFAULT 'na',
    "fulfillment_status" "claim_order_fulfillment_status_enum" NOT NULL DEFAULT 'not_fulfilled',
    "type" "claim_order_type_enum" NOT NULL,
    "order_id" VARCHAR NOT NULL,
    "shipping_address_id" VARCHAR,
    "refund_amount" INTEGER,
    "canceled_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "idempotency_key" VARCHAR,
    "no_notification" BOOLEAN,

    CONSTRAINT "PK_8981f5595a4424021466aa4c7a4" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claim_tag" (
    "id" VARCHAR NOT NULL,
    "value" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_7761180541142a5926501018d34" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" SERIAL NOT NULL,
    "iso_2" VARCHAR NOT NULL,
    "iso_3" VARCHAR NOT NULL,
    "num_code" INTEGER NOT NULL,
    "name" VARCHAR NOT NULL,
    "display_name" VARCHAR NOT NULL,
    "region_id" VARCHAR,

    CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currency" (
    "code" VARCHAR NOT NULL,
    "symbol" VARCHAR NOT NULL,
    "symbol_native" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_723472e41cae44beb0763f4039c" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "custom_shipping_option" (
    "id" VARCHAR NOT NULL,
    "price" INTEGER NOT NULL,
    "shipping_option_id" VARCHAR NOT NULL,
    "cart_id" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_8dfcb5c1172c29eec4a728420cc" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "first_name" VARCHAR,
    "last_name" VARCHAR,
    "billing_address_id" VARCHAR,
    "password_hash" VARCHAR,
    "phone" VARCHAR,
    "has_account" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_group" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_88e7da3ff7262d9e0a35aa3664e" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_group_customers" (
    "customer_group_id" VARCHAR NOT NULL,
    "customer_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_e28a55e34ad1e2d3df9a0ac86d3" PRIMARY KEY ("customer_group_id","customer_id")
);

-- CreateTable
CREATE TABLE "discount" (
    "id" VARCHAR NOT NULL,
    "code" VARCHAR NOT NULL,
    "is_dynamic" BOOLEAN NOT NULL,
    "rule_id" VARCHAR,
    "is_disabled" BOOLEAN NOT NULL,
    "parent_discount_id" VARCHAR,
    "starts_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ends_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "usage_limit" INTEGER,
    "usage_count" INTEGER NOT NULL DEFAULT 0,
    "valid_duration" VARCHAR,

    CONSTRAINT "PK_d05d8712e429673e459e7f1cddb" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_condition" (
    "id" VARCHAR NOT NULL,
    "type" "discount_condition_type_enum" NOT NULL,
    "operator" "discount_condition_operator_enum" NOT NULL,
    "discount_rule_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_e6b81d83133ddc21a2baf2e2204" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_condition_customer_group" (
    "customer_group_id" VARCHAR NOT NULL,
    "condition_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "PK_cdc8b2277169a16b8b7d4c73e0e" PRIMARY KEY ("customer_group_id","condition_id")
);

-- CreateTable
CREATE TABLE "discount_condition_product" (
    "product_id" VARCHAR NOT NULL,
    "condition_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "PK_994eb4529fdbf14450d64ec17e8" PRIMARY KEY ("product_id","condition_id")
);

-- CreateTable
CREATE TABLE "discount_condition_product_collection" (
    "product_collection_id" VARCHAR NOT NULL,
    "condition_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "PK_b3508fc787aa4a38705866cbb6d" PRIMARY KEY ("product_collection_id","condition_id")
);

-- CreateTable
CREATE TABLE "discount_condition_product_tag" (
    "product_tag_id" VARCHAR NOT NULL,
    "condition_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "PK_a95382c1e62205b121aa058682b" PRIMARY KEY ("product_tag_id","condition_id")
);

-- CreateTable
CREATE TABLE "discount_condition_product_type" (
    "product_type_id" VARCHAR NOT NULL,
    "condition_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "PK_35d538a5a24399d0df978df12ed" PRIMARY KEY ("product_type_id","condition_id")
);

-- CreateTable
CREATE TABLE "discount_regions" (
    "discount_id" VARCHAR NOT NULL,
    "region_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_15974566a8b6e04a7c754e85b75" PRIMARY KEY ("discount_id","region_id")
);

-- CreateTable
CREATE TABLE "discount_rule" (
    "id" VARCHAR NOT NULL,
    "description" VARCHAR,
    "type" "discount_rule_type_enum" NOT NULL,
    "value" INTEGER NOT NULL,
    "allocation" "discount_rule_allocation_enum",
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_ac2c280de3701b2d66f6817f760" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_rule_products" (
    "discount_rule_id" VARCHAR NOT NULL,
    "product_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_351c8c92f5d27283c445cd022ee" PRIMARY KEY ("discount_rule_id","product_id")
);

-- CreateTable
CREATE TABLE "draft_order" (
    "id" VARCHAR NOT NULL,
    "status" "draft_order_status_enum" NOT NULL DEFAULT 'open',
    "display_id" SERIAL NOT NULL,
    "cart_id" VARCHAR,
    "order_id" VARCHAR,
    "canceled_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "idempotency_key" VARCHAR,
    "no_notification_order" BOOLEAN,

    CONSTRAINT "PK_f478946c183d98f8d88a94cfcd7" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fulfillment" (
    "id" VARCHAR NOT NULL,
    "swap_id" VARCHAR,
    "order_id" VARCHAR,
    "tracking_numbers" JSONB NOT NULL DEFAULT '[]',
    "data" JSONB NOT NULL,
    "shipped_at" TIMESTAMPTZ(6),
    "canceled_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "idempotency_key" VARCHAR,
    "provider_id" VARCHAR,
    "claim_order_id" VARCHAR,
    "no_notification" BOOLEAN,
    "location_id" VARCHAR,

    CONSTRAINT "PK_50c102da132afffae660585981f" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fulfillment_item" (
    "fulfillment_id" VARCHAR NOT NULL,
    "item_id" VARCHAR NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PK_bc3e8a388de75db146a249922e0" PRIMARY KEY ("fulfillment_id","item_id")
);

-- CreateTable
CREATE TABLE "fulfillment_provider" (
    "id" VARCHAR NOT NULL,
    "is_installed" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PK_beb35a6de60a6c4f91d5ae57e44" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gift_card" (
    "id" VARCHAR NOT NULL,
    "code" VARCHAR NOT NULL,
    "value" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "region_id" VARCHAR NOT NULL,
    "order_id" VARCHAR,
    "is_disabled" BOOLEAN NOT NULL DEFAULT false,
    "ends_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "tax_rate" REAL,

    CONSTRAINT "PK_af4e338d2d41035042843ad641f" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gift_card_transaction" (
    "id" VARCHAR NOT NULL,
    "gift_card_id" VARCHAR NOT NULL,
    "order_id" VARCHAR NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_taxable" BOOLEAN,
    "tax_rate" REAL,

    CONSTRAINT "PK_cfb5b4ba5447a507aef87d73fe7" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "idempotency_key" (
    "id" VARCHAR NOT NULL,
    "idempotency_key" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "locked_at" TIMESTAMPTZ(6),
    "request_method" VARCHAR,
    "request_params" JSONB,
    "request_path" VARCHAR,
    "response_code" INTEGER,
    "response_body" JSONB,
    "recovery_point" VARCHAR NOT NULL DEFAULT 'started',

    CONSTRAINT "PK_213f125e14469be304f9ff1d452" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" VARCHAR NOT NULL,
    "url" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invite" (
    "id" VARCHAR NOT NULL,
    "user_email" VARCHAR NOT NULL,
    "role" "invite_role_enum" DEFAULT 'member',
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "token" VARCHAR NOT NULL,
    "expires_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_fc9fa190e5a3c5d80604a4f63e1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "line_item" (
    "id" VARCHAR NOT NULL,
    "cart_id" VARCHAR,
    "order_id" VARCHAR,
    "swap_id" VARCHAR,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR,
    "thumbnail" VARCHAR,
    "is_giftcard" BOOLEAN NOT NULL DEFAULT false,
    "should_merge" BOOLEAN NOT NULL DEFAULT true,
    "allow_discounts" BOOLEAN NOT NULL DEFAULT true,
    "has_shipping" BOOLEAN,
    "unit_price" INTEGER NOT NULL,
    "variant_id" VARCHAR,
    "quantity" INTEGER NOT NULL,
    "fulfilled_quantity" INTEGER,
    "returned_quantity" INTEGER,
    "shipped_quantity" INTEGER,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "claim_order_id" VARCHAR,
    "is_return" BOOLEAN NOT NULL DEFAULT false,
    "original_item_id" VARCHAR,
    "order_edit_id" VARCHAR,

    CONSTRAINT "PK_cce6b13e67fa506d1d9618ac68b" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "line_item_adjustment" (
    "id" VARCHAR NOT NULL,
    "item_id" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "discount_id" VARCHAR,
    "amount" DECIMAL NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "PK_2b1360103753df2dc8257c2c8c3" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "line_item_tax_line" (
    "id" VARCHAR NOT NULL,
    "rate" REAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "code" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "item_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_4a0f4322fcd5ce4af85727f89a8" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "migrations" (
    "id" SERIAL NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "money_amount" (
    "id" VARCHAR NOT NULL,
    "currency_code" VARCHAR NOT NULL,
    "amount" INTEGER NOT NULL,
    "region_id" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "min_quantity" INTEGER,
    "max_quantity" INTEGER,
    "price_list_id" VARCHAR,

    CONSTRAINT "PK_022e49a7e21a8dfb820f788778a" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note" (
    "id" VARCHAR NOT NULL,
    "value" VARCHAR NOT NULL,
    "resource_type" VARCHAR NOT NULL,
    "resource_id" VARCHAR NOT NULL,
    "author_id" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" VARCHAR NOT NULL,
    "event_name" VARCHAR,
    "resource_type" VARCHAR NOT NULL,
    "resource_id" VARCHAR NOT NULL,
    "customer_id" VARCHAR,
    "to" VARCHAR NOT NULL,
    "data" JSONB NOT NULL,
    "parent_id" VARCHAR,
    "provider_id" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_provider" (
    "id" VARCHAR NOT NULL,
    "is_installed" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PK_0425c2423e2ce9fdfd5c23761d9" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oauth" (
    "id" VARCHAR NOT NULL,
    "display_name" VARCHAR NOT NULL,
    "application_name" VARCHAR NOT NULL,
    "install_url" VARCHAR,
    "uninstall_url" VARCHAR,
    "data" JSONB,

    CONSTRAINT "PK_a957b894e50eb16b969c0640a8d" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" VARCHAR NOT NULL,
    "status" "order_status_enum" NOT NULL DEFAULT 'pending',
    "fulfillment_status" "order_fulfillment_status_enum" NOT NULL DEFAULT 'not_fulfilled',
    "payment_status" "order_payment_status_enum" NOT NULL DEFAULT 'not_paid',
    "display_id" SERIAL NOT NULL,
    "cart_id" VARCHAR,
    "customer_id" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "billing_address_id" VARCHAR,
    "shipping_address_id" VARCHAR,
    "region_id" VARCHAR NOT NULL,
    "currency_code" VARCHAR NOT NULL,
    "tax_rate" REAL,
    "canceled_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "idempotency_key" VARCHAR,
    "draft_order_id" VARCHAR,
    "no_notification" BOOLEAN,
    "external_id" VARCHAR,
    "sales_channel_id" VARCHAR,

    CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_discounts" (
    "order_id" VARCHAR NOT NULL,
    "discount_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_a7418714ffceebc125bf6d8fcfe" PRIMARY KEY ("order_id","discount_id")
);

-- CreateTable
CREATE TABLE "order_edit" (
    "id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_id" VARCHAR NOT NULL,
    "internal_note" VARCHAR,
    "created_by" VARCHAR NOT NULL,
    "requested_by" VARCHAR,
    "requested_at" TIMESTAMPTZ(6),
    "confirmed_by" VARCHAR,
    "confirmed_at" TIMESTAMPTZ(6),
    "declined_by" VARCHAR,
    "declined_reason" VARCHAR,
    "declined_at" TIMESTAMPTZ(6),
    "canceled_by" VARCHAR,
    "canceled_at" TIMESTAMPTZ(6),
    "payment_collection_id" VARCHAR,

    CONSTRAINT "PK_58ab6acf2e84b4e827f5f846f7a" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_gift_cards" (
    "order_id" VARCHAR NOT NULL,
    "gift_card_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_49a8ec66a6625d7c2e3526e05b4" PRIMARY KEY ("order_id","gift_card_id")
);

-- CreateTable
CREATE TABLE "order_item_change" (
    "id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "type" "order_item_change_type_enum" NOT NULL,
    "order_edit_id" VARCHAR NOT NULL,
    "original_line_item_id" VARCHAR,
    "line_item_id" VARCHAR,

    CONSTRAINT "PK_d6eb138f77ffdee83567b85af0c" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" VARCHAR NOT NULL,
    "swap_id" VARCHAR,
    "cart_id" VARCHAR,
    "order_id" VARCHAR,
    "amount" INTEGER NOT NULL,
    "currency_code" VARCHAR NOT NULL,
    "amount_refunded" INTEGER NOT NULL DEFAULT 0,
    "provider_id" VARCHAR NOT NULL,
    "data" JSONB NOT NULL,
    "captured_at" TIMESTAMPTZ(6),
    "canceled_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "idempotency_key" VARCHAR,

    CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_collection" (
    "id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "type" "PAYMENT_COLLECTION_TYPE_ENUM" NOT NULL,
    "status" "PAYMENT_COLLECTION_STATUS_ENUM" NOT NULL,
    "description" TEXT,
    "amount" INTEGER NOT NULL,
    "authorized_amount" INTEGER,
    "region_id" VARCHAR NOT NULL,
    "currency_code" VARCHAR NOT NULL,
    "metadata" JSONB,
    "created_by" VARCHAR NOT NULL,

    CONSTRAINT "PK_payment_collection_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_collection_payments" (
    "payment_collection_id" VARCHAR NOT NULL,
    "payment_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_payment_collection_payments" PRIMARY KEY ("payment_collection_id","payment_id")
);

-- CreateTable
CREATE TABLE "payment_collection_sessions" (
    "payment_collection_id" VARCHAR NOT NULL,
    "payment_session_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_payment_collection_sessions" PRIMARY KEY ("payment_collection_id","payment_session_id")
);

-- CreateTable
CREATE TABLE "payment_provider" (
    "id" VARCHAR NOT NULL,
    "is_installed" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PK_ea94f42b6c88e9191c3649d7522" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_session" (
    "id" VARCHAR NOT NULL,
    "cart_id" VARCHAR,
    "provider_id" VARCHAR NOT NULL,
    "is_selected" BOOLEAN,
    "status" "payment_session_status_enum" NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idempotency_key" VARCHAR,
    "payment_authorized_at" TIMESTAMPTZ(6),
    "amount" INTEGER,
    "is_initiated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_a1a91b20f7f3b1e5afb5485cbcd" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_list" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "type" "price_list_type_enum" NOT NULL DEFAULT 'sale',
    "status" "price_list_status_enum" NOT NULL DEFAULT 'draft',
    "starts_at" TIMESTAMPTZ(6),
    "ends_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "PK_52ea7826468b1c889cb2c28df03" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_list_customer_groups" (
    "price_list_id" VARCHAR NOT NULL,
    "customer_group_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_1afcbe15cc8782dc80c05707df9" PRIMARY KEY ("price_list_id","customer_group_id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "subtitle" VARCHAR,
    "description" VARCHAR,
    "handle" VARCHAR,
    "is_giftcard" BOOLEAN NOT NULL DEFAULT false,
    "thumbnail" VARCHAR,
    "weight" INTEGER,
    "length" INTEGER,
    "height" INTEGER,
    "width" INTEGER,
    "hs_code" VARCHAR,
    "origin_country" VARCHAR,
    "mid_code" VARCHAR,
    "material" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "collection_id" VARCHAR,
    "type_id" VARCHAR,
    "discountable" BOOLEAN NOT NULL DEFAULT true,
    "status" "product_status_enum" NOT NULL DEFAULT 'draft',
    "external_id" VARCHAR,

    CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category" (
    "id" VARCHAR NOT NULL,
    "name" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "parent_category_id" VARCHAR,
    "mpath" TEXT,
    "is_active" BOOLEAN DEFAULT false,
    "is_internal" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rank" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL DEFAULT '',
    "metadata" JSONB,

    CONSTRAINT "PK_qgguwbn1cwstxk93efl0px9oqwt" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category_product" (
    "product_category_id" VARCHAR NOT NULL,
    "product_id" VARCHAR NOT NULL
);

-- CreateTable
CREATE TABLE "product_collection" (
    "id" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "handle" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_49d419fc77d3aed46c835c558ac" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_images" (
    "product_id" VARCHAR NOT NULL,
    "image_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_10de97980da2e939c4c0e8423f2" PRIMARY KEY ("product_id","image_id")
);

-- CreateTable
CREATE TABLE "product_option" (
    "id" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "product_id" VARCHAR,

    CONSTRAINT "PK_4cf3c467e9bc764bdd32c4cd938" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_option_value" (
    "id" VARCHAR NOT NULL,
    "value" VARCHAR NOT NULL,
    "option_id" VARCHAR NOT NULL,
    "variant_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_2ab71ed3b21be5800905c621535" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_sales_channel" (
    "product_id" VARCHAR NOT NULL,
    "sales_channel_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_fd29b6a8bd641052628dee19583" PRIMARY KEY ("product_id","sales_channel_id")
);

-- CreateTable
CREATE TABLE "product_shipping_profile" (
    "profile_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "product_tag" (
    "id" VARCHAR NOT NULL,
    "value" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_1439455c6528caa94fcc8564fda" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_tags" (
    "product_id" VARCHAR NOT NULL,
    "product_tag_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_1cf5c9537e7198df494b71b993f" PRIMARY KEY ("product_id","product_tag_id")
);

-- CreateTable
CREATE TABLE "product_tax_rate" (
    "product_id" VARCHAR NOT NULL,
    "rate_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "PK_326257ce468df46cd5c8c5922e9" PRIMARY KEY ("product_id","rate_id")
);

-- CreateTable
CREATE TABLE "product_type" (
    "id" VARCHAR NOT NULL,
    "value" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_e0843930fbb8854fe36ca39dae1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_type_tax_rate" (
    "product_type_id" VARCHAR NOT NULL,
    "rate_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "PK_ddc9242de1d99bc7674969289f0" PRIMARY KEY ("product_type_id","rate_id")
);

-- CreateTable
CREATE TABLE "product_variant" (
    "id" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "product_id" VARCHAR NOT NULL,
    "sku" VARCHAR,
    "barcode" VARCHAR,
    "ean" VARCHAR,
    "upc" VARCHAR,
    "inventory_quantity" INTEGER NOT NULL,
    "allow_backorder" BOOLEAN NOT NULL DEFAULT false,
    "manage_inventory" BOOLEAN NOT NULL DEFAULT true,
    "hs_code" VARCHAR,
    "origin_country" VARCHAR,
    "mid_code" VARCHAR,
    "material" VARCHAR,
    "weight" INTEGER,
    "length" INTEGER,
    "height" INTEGER,
    "width" INTEGER,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "variant_rank" INTEGER DEFAULT 0,

    CONSTRAINT "PK_1ab69c9935c61f7c70791ae0a9f" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variant_inventory_item" (
    "id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inventory_item_id" TEXT NOT NULL,
    "variant_id" TEXT NOT NULL,
    "required_quantity" INTEGER NOT NULL DEFAULT 1,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "PK_9a1188b8d36f4d198303b4f7efa" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variant_money_amount" (
    "id" VARCHAR NOT NULL,
    "money_amount_id" TEXT NOT NULL,
    "variant_id" TEXT NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_product_variant_money_amount" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publishable_api_key" (
    "id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR,
    "revoked_by" VARCHAR,
    "revoked_at" TIMESTAMPTZ(6),
    "title" VARCHAR NOT NULL,

    CONSTRAINT "PK_9e613278673a87de92c606b4494" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publishable_api_key_sales_channel" (
    "sales_channel_id" VARCHAR NOT NULL,
    "publishable_key_id" VARCHAR NOT NULL,
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "PK_68eaeb14bdac8954460054c567c" PRIMARY KEY ("sales_channel_id","publishable_key_id")
);

-- CreateTable
CREATE TABLE "refund" (
    "id" VARCHAR NOT NULL,
    "order_id" VARCHAR,
    "amount" INTEGER NOT NULL,
    "note" VARCHAR,
    "reason" "refund_reason_enum" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "idempotency_key" VARCHAR,
    "payment_id" VARCHAR,

    CONSTRAINT "PK_f1cefa2e60d99b206c46c1116e5" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "region" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "currency_code" VARCHAR NOT NULL,
    "tax_rate_value" REAL NOT NULL,
    "tax_code" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "gift_cards_taxable" BOOLEAN NOT NULL DEFAULT true,
    "automatic_taxes" BOOLEAN NOT NULL DEFAULT true,
    "tax_provider_id" VARCHAR,

    CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "region_fulfillment_providers" (
    "region_id" VARCHAR NOT NULL,
    "provider_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_5b7d928a1fb50d6803868cfab3a" PRIMARY KEY ("region_id","provider_id")
);

-- CreateTable
CREATE TABLE "region_payment_providers" (
    "region_id" VARCHAR NOT NULL,
    "provider_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_9fa1e69914d3dd752de6b1da407" PRIMARY KEY ("region_id","provider_id")
);

-- CreateTable
CREATE TABLE "return" (
    "id" VARCHAR NOT NULL,
    "status" "return_status_enum" NOT NULL DEFAULT 'requested',
    "swap_id" VARCHAR,
    "order_id" VARCHAR,
    "shipping_data" JSONB,
    "refund_amount" INTEGER NOT NULL,
    "received_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "idempotency_key" VARCHAR,
    "claim_order_id" VARCHAR,
    "no_notification" BOOLEAN,
    "location_id" VARCHAR,

    CONSTRAINT "PK_c8ad68d13e76d75d803b5aeebc4" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "return_item" (
    "return_id" VARCHAR NOT NULL,
    "item_id" VARCHAR NOT NULL,
    "quantity" INTEGER NOT NULL,
    "is_requested" BOOLEAN NOT NULL DEFAULT true,
    "requested_quantity" INTEGER,
    "received_quantity" INTEGER,
    "metadata" JSONB,
    "reason_id" VARCHAR,
    "note" VARCHAR,

    CONSTRAINT "PK_46409dc1dd5f38509b9000c3069" PRIMARY KEY ("return_id","item_id")
);

-- CreateTable
CREATE TABLE "return_reason" (
    "id" VARCHAR NOT NULL,
    "value" VARCHAR NOT NULL,
    "label" VARCHAR NOT NULL,
    "description" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "parent_return_reason_id" VARCHAR,

    CONSTRAINT "PK_95fd1172973165790903e65660a" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_channel" (
    "id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "is_disabled" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,

    CONSTRAINT "PK_d1eb0b923ea5a0eb1e0916191f1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_channel_location" (
    "id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sales_channel_id" TEXT NOT NULL,
    "location_id" TEXT NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "PK_afd2c2c52634bc8280a9c9ee533" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_method" (
    "id" VARCHAR NOT NULL,
    "shipping_option_id" VARCHAR NOT NULL,
    "order_id" VARCHAR,
    "cart_id" VARCHAR,
    "swap_id" VARCHAR,
    "return_id" VARCHAR,
    "price" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "claim_order_id" VARCHAR,

    CONSTRAINT "PK_b9b0adfad3c6b99229c1e7d4865" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_method_tax_line" (
    "id" VARCHAR NOT NULL,
    "rate" REAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "code" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "shipping_method_id" VARCHAR NOT NULL,

    CONSTRAINT "PK_54c94f5908aacbd51cf0a73edb1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_option" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "region_id" VARCHAR NOT NULL,
    "profile_id" VARCHAR NOT NULL,
    "provider_id" VARCHAR NOT NULL,
    "price_type" "shipping_option_price_type_enum" NOT NULL,
    "amount" INTEGER,
    "is_return" BOOLEAN NOT NULL DEFAULT false,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "admin_only" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_2e56fddaa65f3a26d402e5d786e" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_option_requirement" (
    "id" VARCHAR NOT NULL,
    "shipping_option_id" VARCHAR NOT NULL,
    "type" "shipping_option_requirement_type_enum" NOT NULL,
    "amount" INTEGER NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "PK_a0ff15442606d9f783602cb23a7" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_profile" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "type" "shipping_profile_type_enum" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,

    CONSTRAINT "PK_c8120e4543a5a3a121f2968a1ec" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_tax_rate" (
    "shipping_option_id" VARCHAR NOT NULL,
    "rate_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "PK_bcd93b14d7e2695365d383f5eae" PRIMARY KEY ("shipping_option_id","rate_id")
);

-- CreateTable
CREATE TABLE "staged_job" (
    "id" VARCHAR NOT NULL,
    "event_name" VARCHAR NOT NULL,
    "data" JSONB NOT NULL,
    "options" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "PK_9a28fb48c46c5509faf43ac8c8d" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL DEFAULT 'Medusa Store',
    "default_currency_code" VARCHAR NOT NULL DEFAULT 'usd',
    "swap_link_template" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "payment_link_template" VARCHAR,
    "invite_link_template" VARCHAR,
    "default_sales_channel_id" VARCHAR,
    "default_location_id" VARCHAR,

    CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_currencies" (
    "store_id" VARCHAR NOT NULL,
    "currency_code" VARCHAR NOT NULL,

    CONSTRAINT "PK_0f2bff3bccc785c320a4df836de" PRIMARY KEY ("store_id","currency_code")
);

-- CreateTable
CREATE TABLE "swap" (
    "id" VARCHAR NOT NULL,
    "fulfillment_status" "swap_fulfillment_status_enum" NOT NULL,
    "payment_status" "swap_payment_status_enum" NOT NULL,
    "order_id" VARCHAR NOT NULL,
    "difference_due" INTEGER,
    "shipping_address_id" VARCHAR,
    "cart_id" VARCHAR,
    "confirmed_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "idempotency_key" VARCHAR,
    "no_notification" BOOLEAN,
    "canceled_at" TIMESTAMPTZ(6),
    "allow_backorder" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_4a10d0f359339acef77e7f986d9" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_provider" (
    "id" VARCHAR NOT NULL,
    "is_installed" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PK_b198bf82ba6a317c11763d99b99" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_rate" (
    "id" VARCHAR NOT NULL,
    "rate" REAL,
    "code" VARCHAR,
    "name" VARCHAR NOT NULL,
    "region_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "PK_23b71b53f650c0b39e99ccef4fd" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracking_link" (
    "id" VARCHAR NOT NULL,
    "url" VARCHAR,
    "tracking_number" VARCHAR NOT NULL,
    "fulfillment_id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "idempotency_key" VARCHAR,

    CONSTRAINT "PK_fcfd77feb9012ec2126d7c0bfb6" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "first_name" VARCHAR,
    "last_name" VARCHAR,
    "password_hash" VARCHAR,
    "api_token" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "metadata" JSONB,
    "role" "user_role_enum" DEFAULT 'member',

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "product_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IDX_9c9614b2f9d01665800ea8dbff" ON "address"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "REL_9d1a161434c610aae7c3df2dc7" ON "cart"("payment_id");

-- CreateIndex
CREATE INDEX "IDX_242205c81c1152fab1b6e84847" ON "cart"("customer_id");

-- CreateIndex
CREATE INDEX "IDX_484c329f4783be4e18e5e2ff09" ON "cart"("region_id");

-- CreateIndex
CREATE INDEX "IDX_6b9c66b5e36f7c827dfaa092f9" ON "cart"("billing_address_id");

-- CreateIndex
CREATE INDEX "IDX_9d1a161434c610aae7c3df2dc7" ON "cart"("payment_id");

-- CreateIndex
CREATE INDEX "IDX_ced15a9a695d2b5db9dabce763" ON "cart"("shipping_address_id");

-- CreateIndex
CREATE INDEX "IDX_6680319ebe1f46d18f106191d5" ON "cart_discounts"("cart_id");

-- CreateIndex
CREATE INDEX "IDX_8df75ef4f35f217768dc113545" ON "cart_discounts"("discount_id");

-- CreateIndex
CREATE INDEX "IDX_0fb38b6d167793192bc126d835" ON "cart_gift_cards"("gift_card_id");

-- CreateIndex
CREATE INDEX "IDX_d38047a90f3d42f0be7909e8ae" ON "cart_gift_cards"("cart_id");

-- CreateIndex
CREATE INDEX "IDX_21cbfedd83d736d86f4c6f4ce5" ON "claim_image"("claim_item_id");

-- CreateIndex
CREATE INDEX "IDX_64980511ca32c8e92b417644af" ON "claim_item"("variant_id");

-- CreateIndex
CREATE INDEX "IDX_6e0cad0daef76bb642675910b9" ON "claim_item"("item_id");

-- CreateIndex
CREATE INDEX "IDX_900a9c3834257304396b2b0fe7" ON "claim_item"("claim_order_id");

-- CreateIndex
CREATE INDEX "IDX_c2c0f3edf39515bd15432afe6e" ON "claim_item_tags"("item_id");

-- CreateIndex
CREATE INDEX "IDX_dc9bbf9fcb9ba458d25d512811" ON "claim_item_tags"("tag_id");

-- CreateIndex
CREATE INDEX "IDX_017d58bf8260c6e1a2588d258e" ON "claim_order"("shipping_address_id");

-- CreateIndex
CREATE INDEX "IDX_f49e3974465d3c3a33d449d3f3" ON "claim_order"("order_id");

-- CreateIndex
CREATE INDEX "IDX_ec10c54769877840c132260e4a" ON "claim_tag"("value");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_e78901b1131eaf8203d9b1cb5f" ON "country"("iso_2");

-- CreateIndex
CREATE INDEX "IDX_b1aac8314662fa6b25569a575b" ON "country"("region_id");

-- CreateIndex
CREATE INDEX "IDX_44090cb11b06174cbcc667e91c" ON "custom_shipping_option"("shipping_option_id");

-- CreateIndex
CREATE INDEX "IDX_93caeb1bb70d37c1d36d6701a7" ON "custom_shipping_option"("cart_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_0f838b122a9a01d921aa1cdb669" ON "custom_shipping_option"("shipping_option_id", "cart_id");

-- CreateIndex
CREATE UNIQUE INDEX "REL_8abe81b9aac151ae60bf507ad1" ON "customer"("billing_address_id");

-- CreateIndex
CREATE INDEX "IDX_8abe81b9aac151ae60bf507ad1" ON "customer"("billing_address_id");

-- CreateIndex
CREATE INDEX "IDX_3c6412d076292f439269abe1a2" ON "customer_group_customers"("customer_id");

-- CreateIndex
CREATE INDEX "IDX_620330964db8d2999e67b0dbe3" ON "customer_group_customers"("customer_group_id");

-- CreateIndex
CREATE INDEX "IDX_ac2c280de3701b2d66f6817f76" ON "discount"("rule_id");

-- CreateIndex
CREATE INDEX "IDX_efff700651718e452ca9580a62" ON "discount_condition"("discount_rule_id");

-- CreateIndex
CREATE UNIQUE INDEX "dctypeuniq" ON "discount_condition"("type", "operator", "discount_rule_id");

-- CreateIndex
CREATE INDEX "IDX_4d5f98645a67545d8dea42e2eb" ON "discount_condition_customer_group"("customer_group_id");

-- CreateIndex
CREATE INDEX "IDX_8486ee16e69013c645d0b8716b" ON "discount_condition_customer_group"("condition_id");

-- CreateIndex
CREATE INDEX "IDX_c759f53b2e48e8cfb50638fe4e" ON "discount_condition_product"("product_id");

-- CreateIndex
CREATE INDEX "IDX_f05132301e95bdab4ba1cf29a2" ON "discount_condition_product"("condition_id");

-- CreateIndex
CREATE INDEX "IDX_a0b05dc4257abe639cb75f8eae" ON "discount_condition_product_collection"("product_collection_id");

-- CreateIndex
CREATE INDEX "IDX_a1c4f9cfb599ad1f0db39cadd5" ON "discount_condition_product_collection"("condition_id");

-- CreateIndex
CREATE INDEX "IDX_01486cc9dc6b36bf658685535f" ON "discount_condition_product_tag"("product_tag_id");

-- CreateIndex
CREATE INDEX "IDX_fbb2499551ed074526f3ee3624" ON "discount_condition_product_tag"("condition_id");

-- CreateIndex
CREATE INDEX "IDX_6ef23ce0b1d9cf9b5b833e52b9" ON "discount_condition_product_type"("condition_id");

-- CreateIndex
CREATE INDEX "IDX_e706deb68f52ab2756119b9e70" ON "discount_condition_product_type"("product_type_id");

-- CreateIndex
CREATE INDEX "IDX_a21a7ffbe420d492eb46c305fe" ON "discount_regions"("region_id");

-- CreateIndex
CREATE INDEX "IDX_f4194aa81073f3fab8aa86906f" ON "discount_regions"("discount_id");

-- CreateIndex
CREATE INDEX "IDX_4e0739e5f0244c08d41174ca08" ON "discount_rule_products"("discount_rule_id");

-- CreateIndex
CREATE INDEX "IDX_be66106a673b88a81c603abe7e" ON "discount_rule_products"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "REL_5bd11d0e2a9628128e2c26fd0a" ON "draft_order"("cart_id");

-- CreateIndex
CREATE UNIQUE INDEX "REL_8f6dd6c49202f1466ebf21e77d" ON "draft_order"("order_id");

-- CreateIndex
CREATE INDEX "IDX_5bd11d0e2a9628128e2c26fd0a" ON "draft_order"("cart_id");

-- CreateIndex
CREATE INDEX "IDX_8f6dd6c49202f1466ebf21e77d" ON "draft_order"("order_id");

-- CreateIndex
CREATE INDEX "IDX_e87cc617a22ef4edce5601edab" ON "draft_order"("display_id");

-- CreateIndex
CREATE INDEX "IDX_a52e234f729db789cf473297a5" ON "fulfillment"("swap_id");

-- CreateIndex
CREATE INDEX "IDX_beb35a6de60a6c4f91d5ae57e4" ON "fulfillment"("provider_id");

-- CreateIndex
CREATE INDEX "IDX_d73e55964e0ff2db8f03807d52" ON "fulfillment"("claim_order_id");

-- CreateIndex
CREATE INDEX "IDX_f129acc85e346a10eed12b86fc" ON "fulfillment"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_53cb5605fa42e82b4d47b47bda" ON "gift_card"("code");

-- CreateIndex
CREATE INDEX "IDX_b6bcf8c3903097b84e85154eed" ON "gift_card"("region_id");

-- CreateIndex
CREATE INDEX "IDX_dfc1f02bb0552e79076aa58dbb" ON "gift_card"("order_id");

-- CreateIndex
CREATE INDEX "IDX_d7d441b81012f87d4265fa57d2" ON "gift_card_transaction"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "gcuniq" ON "gift_card_transaction"("gift_card_id", "order_id");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_a421bf4588d0004a9b0c0fe84f" ON "idempotency_key"("idempotency_key");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_6b0ce4b4bcfd24491510bf19d1" ON "invite"("user_email");

-- CreateIndex
CREATE INDEX "IDX_118e3c48f09a7728f41023c94e" ON "line_item"("claim_order_id");

-- CreateIndex
CREATE INDEX "IDX_27283ee631862266d0f1c68064" ON "line_item"("cart_id");

-- CreateIndex
CREATE INDEX "IDX_3fa354d8d1233ff81097b2fcb6" ON "line_item"("swap_id");

-- CreateIndex
CREATE INDEX "IDX_43a2b24495fe1d9fc2a9c835bc" ON "line_item"("order_id");

-- CreateIndex
CREATE INDEX "IDX_5371cbaa3be5200f373d24e3d5" ON "line_item"("variant_id");

-- CreateIndex
CREATE INDEX "IDX_2f41b20a71f30e60471d7e3769" ON "line_item_adjustment"("discount_id");

-- CreateIndex
CREATE INDEX "IDX_be9aea2ccf3567007b6227da4d" ON "line_item_adjustment"("item_id");

-- CreateIndex
CREATE INDEX "IDX_5077fa54b0d037e984385dfe8a" ON "line_item_tax_line"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_3c2af51043ed7243e7d9775a2ad" ON "line_item_tax_line"("item_id", "code");

-- CreateIndex
CREATE INDEX "IDX_money_amount_currency_code" ON "money_amount"("currency_code");

-- CreateIndex
CREATE INDEX "idx_money_amount_region_id" ON "money_amount"("region_id");

-- CreateIndex
CREATE INDEX "IDX_3287f98befad26c3a7dab088cf" ON "note"("resource_id");

-- CreateIndex
CREATE INDEX "IDX_f74980b411cf94af523a72af7d" ON "note"("resource_type");

-- CreateIndex
CREATE INDEX "IDX_b5df0f53a74b9d0c0a2b652c88" ON "notification"("customer_id");

-- CreateIndex
CREATE INDEX "IDX_df1494d263740fcfb1d09a98fc" ON "notification"("resource_type");

-- CreateIndex
CREATE INDEX "IDX_ea6a358d9ce41c16499aae55f9" ON "notification"("resource_id");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_c49c061b1a686843c5d673506f" ON "oauth"("application_name");

-- CreateIndex
CREATE UNIQUE INDEX "REL_c99a206eb11ad45f6b7f04f2dc" ON "order"("cart_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_727b872f86c7378474a8fa46147" ON "order"("draft_order_id");

-- CreateIndex
CREATE INDEX "IDX_19b0c6293443d1b464f604c331" ON "order"("shipping_address_id");

-- CreateIndex
CREATE INDEX "IDX_5568d3b9ce9f7abeeb37511ecf" ON "order"("billing_address_id");

-- CreateIndex
CREATE INDEX "IDX_579e01fb94f4f58db480857e05" ON "order"("display_id");

-- CreateIndex
CREATE INDEX "IDX_c99a206eb11ad45f6b7f04f2dc" ON "order"("cart_id");

-- CreateIndex
CREATE INDEX "IDX_cd7812c96209c5bdd48a6b858b" ON "order"("customer_id");

-- CreateIndex
CREATE INDEX "IDX_e1fcce2b18dbcdbe0a5ba9a68b" ON "order"("region_id");

-- CreateIndex
CREATE INDEX "IDX_order_currency_code" ON "order"("currency_code");

-- CreateIndex
CREATE INDEX "IDX_0fc1ec4e3db9001ad60c19daf1" ON "order_discounts"("discount_id");

-- CreateIndex
CREATE INDEX "IDX_e7b488cebe333f449398769b2c" ON "order_discounts"("order_id");

-- CreateIndex
CREATE INDEX "IDX_order_edit_order_id" ON "order_edit"("order_id");

-- CreateIndex
CREATE INDEX "IDX_order_edit_payment_collection_id" ON "order_edit"("payment_collection_id");

-- CreateIndex
CREATE INDEX "IDX_e62ff11e4730bb3adfead979ee" ON "order_gift_cards"("order_id");

-- CreateIndex
CREATE INDEX "IDX_f2bb9f71e95b315eb24b2b84cb" ON "order_gift_cards"("gift_card_id");

-- CreateIndex
CREATE UNIQUE INDEX "REL_5f9688929761f7df108b630e64" ON "order_item_change"("line_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_5b7a99181e4db2ea821be0b6196" ON "order_item_change"("order_edit_id", "original_line_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_da93cee3ca0dd50a5246268c2e9" ON "order_item_change"("order_edit_id", "line_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "REL_c17aff091441b7c25ec3d68d36" ON "payment"("swap_id");

-- CreateIndex
CREATE INDEX "IDX_4665f17abc1e81dd58330e5854" ON "payment"("cart_id");

-- CreateIndex
CREATE INDEX "IDX_c17aff091441b7c25ec3d68d36" ON "payment"("swap_id");

-- CreateIndex
CREATE INDEX "IDX_ea94f42b6c88e9191c3649d752" ON "payment"("provider_id");

-- CreateIndex
CREATE INDEX "IDX_f5221735ace059250daac9d980" ON "payment"("order_id");

-- CreateIndex
CREATE INDEX "IDX_payment_currency_code" ON "payment"("currency_code");

-- CreateIndex
CREATE INDEX "IDX_payment_collection_payments_payment_collection_id" ON "payment_collection_payments"("payment_collection_id");

-- CreateIndex
CREATE INDEX "IDX_payment_collection_payments_payment_id" ON "payment_collection_payments"("payment_id");

-- CreateIndex
CREATE INDEX "IDX_payment_collection_sessions_payment_collection_id" ON "payment_collection_sessions"("payment_collection_id");

-- CreateIndex
CREATE INDEX "IDX_payment_collection_sessions_payment_session_id" ON "payment_collection_sessions"("payment_session_id");

-- CreateIndex
CREATE INDEX "IDX_d18ad72f2fb7c87f075825b6f8" ON "payment_session"("provider_id");

-- CreateIndex
CREATE INDEX "IDX_d25ba0787e1510ddc5d442ebcf" ON "payment_session"("cart_id");

-- CreateIndex
CREATE UNIQUE INDEX "OneSelected" ON "payment_session"("cart_id", "is_selected");

-- CreateIndex
CREATE INDEX "IDX_52875734e9dd69064f0041f4d9" ON "price_list_customer_groups"("price_list_id");

-- CreateIndex
CREATE INDEX "IDX_c5516f550433c9b1c2630d787a" ON "price_list_customer_groups"("customer_group_id");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_product_category_handle" ON "product_category"("handle");

-- CreateIndex
CREATE INDEX "IDX_product_category_path" ON "product_category"("mpath");

-- CreateIndex
CREATE UNIQUE INDEX "UniqProductCategoryParentIdRank" ON "product_category"("parent_category_id", "rank");

-- CreateIndex
CREATE INDEX "IDX_pcp_product_category_id" ON "product_category_product"("product_category_id");

-- CreateIndex
CREATE INDEX "IDX_pcp_product_id" ON "product_category_product"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_upcp_product_id_product_category_id" ON "product_category_product"("product_category_id", "product_id");

-- CreateIndex
CREATE INDEX "IDX_2212515ba306c79f42c46a99db" ON "product_images"("image_id");

-- CreateIndex
CREATE INDEX "IDX_4f166bb8c2bfcef2498d97b406" ON "product_images"("product_id");

-- CreateIndex
CREATE INDEX "idx_product_option_value_option_id" ON "product_option_value"("option_id");

-- CreateIndex
CREATE INDEX "idx_product_option_value_variant_id" ON "product_option_value"("variant_id");

-- CreateIndex
CREATE INDEX "IDX_37341bad297fe5cca91f921032" ON "product_sales_channel"("sales_channel_id");

-- CreateIndex
CREATE INDEX "IDX_5a4d5e1e60f97633547821ec8d" ON "product_sales_channel"("product_id");

-- CreateIndex
CREATE INDEX "idx_product_shipping_profile_product_id" ON "product_shipping_profile"("product_id");

-- CreateIndex
CREATE INDEX "idx_product_shipping_profile_profile_id" ON "product_shipping_profile"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "idx_product_shipping_profile_profile_id_product_id_unique" ON "product_shipping_profile"("profile_id", "product_id");

-- CreateIndex
CREATE INDEX "IDX_21683a063fe82dafdf681ecc9c" ON "product_tags"("product_tag_id");

-- CreateIndex
CREATE INDEX "IDX_5b0c6fc53c574299ecc7f9ee22" ON "product_tags"("product_id");

-- CreateIndex
CREATE INDEX "IDX_1d04aebeabb6a89f87e536a124" ON "product_tax_rate"("product_id");

-- CreateIndex
CREATE INDEX "IDX_2484cf14c437a04586b07e7ddd" ON "product_tax_rate"("rate_id");

-- CreateIndex
CREATE INDEX "IDX_25a3138bb236f63d9bb6c8ff11" ON "product_type_tax_rate"("product_type_id");

-- CreateIndex
CREATE INDEX "IDX_ece65a774192b34253abc4cd67" ON "product_type_tax_rate"("rate_id");

-- CreateIndex
CREATE INDEX "IDX_ca67dd080aac5ecf99609960cd" ON "product_variant"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_c9be7c1b11a1a729eb51d1b6bca" ON "product_variant_inventory_item"("variant_id", "inventory_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "idx_product_variant_money_amount_money_amount_id_unique" ON "product_variant_money_amount"("money_amount_id");

-- CreateIndex
CREATE INDEX "idx_product_variant_money_amount_variant_id" ON "product_variant_money_amount"("variant_id");

-- CreateIndex
CREATE INDEX "IDX_id_publishable_api_key_sales_channel" ON "publishable_api_key_sales_channel"("id");

-- CreateIndex
CREATE INDEX "IDX_eec9d9af4ca098e19ea6b499ea" ON "refund"("order_id");

-- CreateIndex
CREATE INDEX "IDX_refund_payment_id" ON "refund"("payment_id");

-- CreateIndex
CREATE INDEX "IDX_region_currency_code" ON "region"("currency_code");

-- CreateIndex
CREATE INDEX "IDX_37f361c38a18d12a3fa3158d0c" ON "region_fulfillment_providers"("provider_id");

-- CreateIndex
CREATE INDEX "IDX_c556e14eff4d6f03db593df955" ON "region_fulfillment_providers"("region_id");

-- CreateIndex
CREATE INDEX "IDX_3a6947180aeec283cd92c59ebb" ON "region_payment_providers"("provider_id");

-- CreateIndex
CREATE INDEX "IDX_8aaa78ba90d3802edac317df86" ON "region_payment_providers"("region_id");

-- CreateIndex
CREATE UNIQUE INDEX "REL_bad82d7bff2b08b87094bfac3d" ON "return"("swap_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_71773d56eb2bacb922bc3283398" ON "return"("claim_order_id");

-- CreateIndex
CREATE INDEX "IDX_71773d56eb2bacb922bc328339" ON "return"("claim_order_id");

-- CreateIndex
CREATE INDEX "IDX_bad82d7bff2b08b87094bfac3d" ON "return"("swap_id");

-- CreateIndex
CREATE INDEX "IDX_d4bd17f918fc6c332b74a368c3" ON "return"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "REL_1d9ad62038998c3a85c77a53cf" ON "shipping_method"("return_id");

-- CreateIndex
CREATE INDEX "IDX_1d9ad62038998c3a85c77a53cf" ON "shipping_method"("return_id");

-- CreateIndex
CREATE INDEX "IDX_5267705a43d547e232535b656c" ON "shipping_method"("order_id");

-- CreateIndex
CREATE INDEX "IDX_d783a66d1c91c0858752c933e6" ON "shipping_method"("claim_order_id");

-- CreateIndex
CREATE INDEX "IDX_d92993a7d554d84571f4eea1d1" ON "shipping_method"("cart_id");

-- CreateIndex
CREATE INDEX "IDX_fb94fa8d5ca940daa2a58139f8" ON "shipping_method"("swap_id");

-- CreateIndex
CREATE INDEX "IDX_fc963e94854bff2714ca84cd19" ON "shipping_method"("shipping_option_id");

-- CreateIndex
CREATE INDEX "IDX_926ca9f29014af8091722dede0" ON "shipping_method_tax_line"("shipping_method_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_cd147fca71e50bc954139fa3104" ON "shipping_method_tax_line"("shipping_method_id", "code");

-- CreateIndex
CREATE INDEX "IDX_5c58105f1752fca0f4ce69f466" ON "shipping_option"("region_id");

-- CreateIndex
CREATE INDEX "IDX_a0e206bfaed3cb63c186091734" ON "shipping_option"("provider_id");

-- CreateIndex
CREATE INDEX "IDX_c951439af4c98bf2bd7fb8726c" ON "shipping_option"("profile_id");

-- CreateIndex
CREATE INDEX "IDX_012a62ba743e427b5ebe9dee18" ON "shipping_option_requirement"("shipping_option_id");

-- CreateIndex
CREATE INDEX "IDX_346e0016cf045b998074774764" ON "shipping_tax_rate"("rate_id");

-- CreateIndex
CREATE INDEX "IDX_f672727ab020df6c50fb64c1a7" ON "shipping_tax_rate"("shipping_option_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_61b0f48cccbb5f41c750bac7286" ON "store"("default_sales_channel_id");

-- CreateIndex
CREATE INDEX "IDX_82a6bbb0b527c20a0002ddcbd6" ON "store_currencies"("currency_code");

-- CreateIndex
CREATE INDEX "IDX_b4f4b63d1736689b7008980394" ON "store_currencies"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "REL_402e8182bc553e082f6380020b" ON "swap"("cart_id");

-- CreateIndex
CREATE INDEX "IDX_52dd74e8c989aa5665ad2852b8" ON "swap"("order_id");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "FK_6df8c6bf969a51d24c1980c4ff4" FOREIGN KEY ("country_code") REFERENCES "country"("iso_2") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "FK_9c9614b2f9d01665800ea8dbff7" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "batch_job" ADD CONSTRAINT "FK_fa53ca4f5fd90605b532802a626" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "FK_242205c81c1152fab1b6e848470" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "FK_484c329f4783be4e18e5e2ff090" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "FK_6b9c66b5e36f7c827dfaa092f94" FOREIGN KEY ("billing_address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "FK_9d1a161434c610aae7c3df2dc7e" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "FK_a2bd3c26f42e754b9249ba78fd6" FOREIGN KEY ("sales_channel_id") REFERENCES "sales_channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "FK_ced15a9a695d2b5db9dabce763d" FOREIGN KEY ("shipping_address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_discounts" ADD CONSTRAINT "FK_6680319ebe1f46d18f106191d59" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_discounts" ADD CONSTRAINT "FK_8df75ef4f35f217768dc1135458" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_gift_cards" ADD CONSTRAINT "FK_0fb38b6d167793192bc126d835e" FOREIGN KEY ("gift_card_id") REFERENCES "gift_card"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_gift_cards" ADD CONSTRAINT "FK_d38047a90f3d42f0be7909e8aea" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "claim_image" ADD CONSTRAINT "FK_21cbfedd83d736d86f4c6f4ce56" FOREIGN KEY ("claim_item_id") REFERENCES "claim_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "claim_item" ADD CONSTRAINT "FK_64980511ca32c8e92b417644afa" FOREIGN KEY ("variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "claim_item" ADD CONSTRAINT "FK_6e0cad0daef76bb642675910b9d" FOREIGN KEY ("item_id") REFERENCES "line_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "claim_item" ADD CONSTRAINT "FK_900a9c3834257304396b2b0fe7c" FOREIGN KEY ("claim_order_id") REFERENCES "claim_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "claim_item_tags" ADD CONSTRAINT "FK_c2c0f3edf39515bd15432afe6e5" FOREIGN KEY ("item_id") REFERENCES "claim_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "claim_item_tags" ADD CONSTRAINT "FK_dc9bbf9fcb9ba458d25d512811b" FOREIGN KEY ("tag_id") REFERENCES "claim_tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "claim_order" ADD CONSTRAINT "FK_017d58bf8260c6e1a2588d258e2" FOREIGN KEY ("shipping_address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "claim_order" ADD CONSTRAINT "FK_f49e3974465d3c3a33d449d3f31" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "country" ADD CONSTRAINT "FK_b1aac8314662fa6b25569a575bb" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "custom_shipping_option" ADD CONSTRAINT "FK_44090cb11b06174cbcc667e91ca" FOREIGN KEY ("shipping_option_id") REFERENCES "shipping_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "custom_shipping_option" ADD CONSTRAINT "FK_93caeb1bb70d37c1d36d6701a7a" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "FK_8abe81b9aac151ae60bf507ad15" FOREIGN KEY ("billing_address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer_group_customers" ADD CONSTRAINT "FK_3c6412d076292f439269abe1a23" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer_group_customers" ADD CONSTRAINT "FK_620330964db8d2999e67b0dbe3e" FOREIGN KEY ("customer_group_id") REFERENCES "customer_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount" ADD CONSTRAINT "FK_2250c5d9e975987ab212f61a663" FOREIGN KEY ("parent_discount_id") REFERENCES "discount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount" ADD CONSTRAINT "FK_ac2c280de3701b2d66f6817f760" FOREIGN KEY ("rule_id") REFERENCES "discount_rule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount_condition" ADD CONSTRAINT "FK_efff700651718e452ca9580a624" FOREIGN KEY ("discount_rule_id") REFERENCES "discount_rule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount_condition_customer_group" ADD CONSTRAINT "FK_4d5f98645a67545d8dea42e2eb8" FOREIGN KEY ("customer_group_id") REFERENCES "customer_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount_condition_customer_group" ADD CONSTRAINT "FK_8486ee16e69013c645d0b8716b6" FOREIGN KEY ("condition_id") REFERENCES "discount_condition"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount_condition_product" ADD CONSTRAINT "FK_c759f53b2e48e8cfb50638fe4e0" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount_condition_product" ADD CONSTRAINT "FK_f05132301e95bdab4ba1cf29a24" FOREIGN KEY ("condition_id") REFERENCES "discount_condition"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount_condition_product_collection" ADD CONSTRAINT "FK_a0b05dc4257abe639cb75f8eae2" FOREIGN KEY ("product_collection_id") REFERENCES "product_collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount_condition_product_collection" ADD CONSTRAINT "FK_a1c4f9cfb599ad1f0db39cadd5f" FOREIGN KEY ("condition_id") REFERENCES "discount_condition"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount_condition_product_tag" ADD CONSTRAINT "FK_01486cc9dc6b36bf658685535f6" FOREIGN KEY ("product_tag_id") REFERENCES "product_tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount_condition_product_tag" ADD CONSTRAINT "FK_fbb2499551ed074526f3ee36241" FOREIGN KEY ("condition_id") REFERENCES "discount_condition"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount_condition_product_type" ADD CONSTRAINT "FK_6ef23ce0b1d9cf9b5b833e52b9d" FOREIGN KEY ("condition_id") REFERENCES "discount_condition"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount_condition_product_type" ADD CONSTRAINT "FK_e706deb68f52ab2756119b9e704" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount_regions" ADD CONSTRAINT "FK_a21a7ffbe420d492eb46c305fec" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount_regions" ADD CONSTRAINT "FK_f4194aa81073f3fab8aa86906ff" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount_rule_products" ADD CONSTRAINT "FK_4e0739e5f0244c08d41174ca08a" FOREIGN KEY ("discount_rule_id") REFERENCES "discount_rule"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discount_rule_products" ADD CONSTRAINT "FK_be66106a673b88a81c603abe7eb" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "draft_order" ADD CONSTRAINT "FK_5bd11d0e2a9628128e2c26fd0a6" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "draft_order" ADD CONSTRAINT "FK_8f6dd6c49202f1466ebf21e77da" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fulfillment" ADD CONSTRAINT "FK_a52e234f729db789cf473297a5c" FOREIGN KEY ("swap_id") REFERENCES "swap"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fulfillment" ADD CONSTRAINT "FK_beb35a6de60a6c4f91d5ae57e44" FOREIGN KEY ("provider_id") REFERENCES "fulfillment_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fulfillment" ADD CONSTRAINT "FK_d73e55964e0ff2db8f03807d52e" FOREIGN KEY ("claim_order_id") REFERENCES "claim_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fulfillment" ADD CONSTRAINT "FK_f129acc85e346a10eed12b86fca" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fulfillment_item" ADD CONSTRAINT "FK_a033f83cc6bd7701a5687ab4b38" FOREIGN KEY ("fulfillment_id") REFERENCES "fulfillment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fulfillment_item" ADD CONSTRAINT "FK_e13ff60e74206b747a1896212d1" FOREIGN KEY ("item_id") REFERENCES "line_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gift_card" ADD CONSTRAINT "FK_b6bcf8c3903097b84e85154eed3" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gift_card" ADD CONSTRAINT "FK_dfc1f02bb0552e79076aa58dbb0" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gift_card_transaction" ADD CONSTRAINT "FK_3ff5597f1d7e02bba41541846f4" FOREIGN KEY ("gift_card_id") REFERENCES "gift_card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gift_card_transaction" ADD CONSTRAINT "FK_d7d441b81012f87d4265fa57d24" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "line_item" ADD CONSTRAINT "FK_118e3c48f09a7728f41023c94ef" FOREIGN KEY ("claim_order_id") REFERENCES "claim_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "line_item" ADD CONSTRAINT "FK_27283ee631862266d0f1c680646" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "line_item" ADD CONSTRAINT "FK_3fa354d8d1233ff81097b2fcb6b" FOREIGN KEY ("swap_id") REFERENCES "swap"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "line_item" ADD CONSTRAINT "FK_43a2b24495fe1d9fc2a9c835bc7" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "line_item" ADD CONSTRAINT "FK_5371cbaa3be5200f373d24e3d5b" FOREIGN KEY ("variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "line_item" ADD CONSTRAINT "line_item_order_edit_fk" FOREIGN KEY ("order_edit_id") REFERENCES "order_edit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "line_item" ADD CONSTRAINT "line_item_original_item_fk" FOREIGN KEY ("original_item_id") REFERENCES "line_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "line_item_adjustment" ADD CONSTRAINT "FK_2f41b20a71f30e60471d7e3769c" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "line_item_adjustment" ADD CONSTRAINT "FK_be9aea2ccf3567007b6227da4d2" FOREIGN KEY ("item_id") REFERENCES "line_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "line_item_tax_line" ADD CONSTRAINT "FK_5077fa54b0d037e984385dfe8ad" FOREIGN KEY ("item_id") REFERENCES "line_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "money_amount" ADD CONSTRAINT "FK_b433e27b7a83e6d12ab26b15b03" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "money_amount" ADD CONSTRAINT "FK_e15811f81339e4bd8c440aebe1c" FOREIGN KEY ("currency_code") REFERENCES "currency"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "money_amount" ADD CONSTRAINT "FK_f249976b079375499662eb80c40" FOREIGN KEY ("price_list_id") REFERENCES "price_list"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "FK_0425c2423e2ce9fdfd5c23761d9" FOREIGN KEY ("provider_id") REFERENCES "notification_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "FK_371db513192c083f48ba63c33be" FOREIGN KEY ("parent_id") REFERENCES "notification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "FK_b5df0f53a74b9d0c0a2b652c88d" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "FK_19b0c6293443d1b464f604c3316" FOREIGN KEY ("shipping_address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "FK_5568d3b9ce9f7abeeb37511ecf2" FOREIGN KEY ("billing_address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "FK_6ff7e874f01b478c115fdd462eb" FOREIGN KEY ("sales_channel_id") REFERENCES "sales_channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "FK_717a141f96b76d794d409f38129" FOREIGN KEY ("currency_code") REFERENCES "currency"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "FK_727b872f86c7378474a8fa46147" FOREIGN KEY ("draft_order_id") REFERENCES "draft_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "FK_c99a206eb11ad45f6b7f04f2dcc" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "FK_e1fcce2b18dbcdbe0a5ba9a68b8" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_discounts" ADD CONSTRAINT "FK_0fc1ec4e3db9001ad60c19daf16" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_discounts" ADD CONSTRAINT "FK_e7b488cebe333f449398769b2cc" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_edit" ADD CONSTRAINT "FK_1f3a251488a91510f57e1bf93cd" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_edit" ADD CONSTRAINT "FK_order_edit_payment_collection_id" FOREIGN KEY ("payment_collection_id") REFERENCES "payment_collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_gift_cards" ADD CONSTRAINT "FK_e62ff11e4730bb3adfead979ee2" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_gift_cards" ADD CONSTRAINT "FK_f2bb9f71e95b315eb24b2b84cb3" FOREIGN KEY ("gift_card_id") REFERENCES "gift_card"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_item_change" ADD CONSTRAINT "FK_44feeebb258bf4cfa4cc4202281" FOREIGN KEY ("order_edit_id") REFERENCES "order_edit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_item_change" ADD CONSTRAINT "FK_5f9688929761f7df108b630e64a" FOREIGN KEY ("line_item_id") REFERENCES "line_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_item_change" ADD CONSTRAINT "FK_b4d53b8d03c9f5e7d4317e818d9" FOREIGN KEY ("original_line_item_id") REFERENCES "line_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "FK_4665f17abc1e81dd58330e58542" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "FK_c17aff091441b7c25ec3d68d36c" FOREIGN KEY ("swap_id") REFERENCES "swap"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "FK_f41553459a4b1491c9893ebc921" FOREIGN KEY ("currency_code") REFERENCES "currency"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "FK_f5221735ace059250daac9d9803" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment_collection" ADD CONSTRAINT "FK_payment_collection_region_id" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment_collection_payments" ADD CONSTRAINT "FK_payment_collection_payments_payment_collection_id" FOREIGN KEY ("payment_collection_id") REFERENCES "payment_collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment_collection_payments" ADD CONSTRAINT "FK_payment_collection_payments_payment_id" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment_collection_sessions" ADD CONSTRAINT "FK_payment_collection_sessions_payment_collection_id" FOREIGN KEY ("payment_collection_id") REFERENCES "payment_collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment_collection_sessions" ADD CONSTRAINT "FK_payment_collection_sessions_payment_session_id" FOREIGN KEY ("payment_session_id") REFERENCES "payment_session"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment_session" ADD CONSTRAINT "FK_d25ba0787e1510ddc5d442ebcfa" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "price_list_customer_groups" ADD CONSTRAINT "FK_52875734e9dd69064f0041f4d92" FOREIGN KEY ("price_list_id") REFERENCES "price_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_list_customer_groups" ADD CONSTRAINT "FK_c5516f550433c9b1c2630d787a7" FOREIGN KEY ("customer_group_id") REFERENCES "customer_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "FK_49d419fc77d3aed46c835c558ac" FOREIGN KEY ("collection_id") REFERENCES "product_collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "FK_e0843930fbb8854fe36ca39dae1" FOREIGN KEY ("type_id") REFERENCES "product_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_category_product" ADD CONSTRAINT "FK_product_category_id" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_category_product" ADD CONSTRAINT "FK_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "FK_2212515ba306c79f42c46a99db7" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "FK_4f166bb8c2bfcef2498d97b4068" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_option" ADD CONSTRAINT "FK_e634fca34f6b594b87fdbee95f6" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_option_value" ADD CONSTRAINT "FK_7234ed737ff4eb1b6ae6e6d7b01" FOREIGN KEY ("variant_id") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_option_value" ADD CONSTRAINT "FK_cdf4388f294b30a25c627d69fe9" FOREIGN KEY ("option_id") REFERENCES "product_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_sales_channel" ADD CONSTRAINT "FK_37341bad297fe5cca91f921032b" FOREIGN KEY ("sales_channel_id") REFERENCES "sales_channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tags" ADD CONSTRAINT "FK_21683a063fe82dafdf681ecc9c4" FOREIGN KEY ("product_tag_id") REFERENCES "product_tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_tags" ADD CONSTRAINT "FK_5b0c6fc53c574299ecc7f9ee22e" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_tax_rate" ADD CONSTRAINT "FK_1d04aebeabb6a89f87e536a124d" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_tax_rate" ADD CONSTRAINT "FK_2484cf14c437a04586b07e7dddb" FOREIGN KEY ("rate_id") REFERENCES "tax_rate"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_type_tax_rate" ADD CONSTRAINT "FK_25a3138bb236f63d9bb6c8ff111" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_type_tax_rate" ADD CONSTRAINT "FK_ece65a774192b34253abc4cd672" FOREIGN KEY ("rate_id") REFERENCES "tax_rate"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_variant" ADD CONSTRAINT "FK_ca67dd080aac5ecf99609960cd2" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "refund" ADD CONSTRAINT "FK_eec9d9af4ca098e19ea6b499eaa" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "refund" ADD CONSTRAINT "FK_refund_payment_id" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "region" ADD CONSTRAINT "FK_3bdd5896ec93be2f1c62a3309a5" FOREIGN KEY ("currency_code") REFERENCES "currency"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "region" ADD CONSTRAINT "FK_91f88052197680f9790272aaf5b" FOREIGN KEY ("tax_provider_id") REFERENCES "tax_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "region_fulfillment_providers" ADD CONSTRAINT "FK_37f361c38a18d12a3fa3158d0cf" FOREIGN KEY ("provider_id") REFERENCES "fulfillment_provider"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "region_fulfillment_providers" ADD CONSTRAINT "FK_c556e14eff4d6f03db593df955e" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "region_payment_providers" ADD CONSTRAINT "FK_3a6947180aeec283cd92c59ebb0" FOREIGN KEY ("provider_id") REFERENCES "payment_provider"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "region_payment_providers" ADD CONSTRAINT "FK_8aaa78ba90d3802edac317df869" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "return" ADD CONSTRAINT "FK_71773d56eb2bacb922bc3283398" FOREIGN KEY ("claim_order_id") REFERENCES "claim_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "return" ADD CONSTRAINT "FK_bad82d7bff2b08b87094bfac3d6" FOREIGN KEY ("swap_id") REFERENCES "swap"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "return" ADD CONSTRAINT "FK_d4bd17f918fc6c332b74a368c36" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "return_item" ADD CONSTRAINT "FK_7edab75b4fc88ea6d4f2574f087" FOREIGN KEY ("return_id") REFERENCES "return"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "return_item" ADD CONSTRAINT "FK_87774591f44564effd8039d7162" FOREIGN KEY ("item_id") REFERENCES "line_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "return_item" ADD CONSTRAINT "FK_d742532378a65022e7ceb328828" FOREIGN KEY ("reason_id") REFERENCES "return_reason"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "return_reason" ADD CONSTRAINT "FK_2250c5d9e975987ab212f61a657" FOREIGN KEY ("parent_return_reason_id") REFERENCES "return_reason"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shipping_method" ADD CONSTRAINT "FK_1d9ad62038998c3a85c77a53cfb" FOREIGN KEY ("return_id") REFERENCES "return"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shipping_method" ADD CONSTRAINT "FK_5267705a43d547e232535b656c2" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shipping_method" ADD CONSTRAINT "FK_d783a66d1c91c0858752c933e68" FOREIGN KEY ("claim_order_id") REFERENCES "claim_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shipping_method" ADD CONSTRAINT "FK_d92993a7d554d84571f4eea1d13" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shipping_method" ADD CONSTRAINT "FK_fb94fa8d5ca940daa2a58139f86" FOREIGN KEY ("swap_id") REFERENCES "swap"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shipping_method" ADD CONSTRAINT "FK_fc963e94854bff2714ca84cd193" FOREIGN KEY ("shipping_option_id") REFERENCES "shipping_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shipping_method_tax_line" ADD CONSTRAINT "FK_926ca9f29014af8091722dede08" FOREIGN KEY ("shipping_method_id") REFERENCES "shipping_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shipping_option" ADD CONSTRAINT "FK_5c58105f1752fca0f4ce69f4663" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shipping_option" ADD CONSTRAINT "FK_a0e206bfaed3cb63c1860917347" FOREIGN KEY ("provider_id") REFERENCES "fulfillment_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shipping_option" ADD CONSTRAINT "FK_c951439af4c98bf2bd7fb8726cd" FOREIGN KEY ("profile_id") REFERENCES "shipping_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shipping_option_requirement" ADD CONSTRAINT "FK_012a62ba743e427b5ebe9dee18e" FOREIGN KEY ("shipping_option_id") REFERENCES "shipping_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shipping_tax_rate" ADD CONSTRAINT "FK_346e0016cf045b9980747747645" FOREIGN KEY ("rate_id") REFERENCES "tax_rate"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shipping_tax_rate" ADD CONSTRAINT "FK_f672727ab020df6c50fb64c1a70" FOREIGN KEY ("shipping_option_id") REFERENCES "shipping_option"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "FK_55beebaa09e947cccca554af222" FOREIGN KEY ("default_currency_code") REFERENCES "currency"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "FK_61b0f48cccbb5f41c750bac7286" FOREIGN KEY ("default_sales_channel_id") REFERENCES "sales_channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store_currencies" ADD CONSTRAINT "FK_82a6bbb0b527c20a0002ddcbd60" FOREIGN KEY ("currency_code") REFERENCES "currency"("code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store_currencies" ADD CONSTRAINT "FK_b4f4b63d1736689b7008980394c" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "swap" ADD CONSTRAINT "FK_402e8182bc553e082f6380020b4" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "swap" ADD CONSTRAINT "FK_52dd74e8c989aa5665ad2852b8b" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "swap" ADD CONSTRAINT "FK_f5189d38b3d3bd496618bf54c57" FOREIGN KEY ("shipping_address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tax_rate" ADD CONSTRAINT "FK_b95a1e03b051993d208366cb960" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tracking_link" ADD CONSTRAINT "FK_471e9e4c96e02ba209a307db32b" FOREIGN KEY ("fulfillment_id") REFERENCES "fulfillment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
