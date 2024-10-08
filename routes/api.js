const router = require("express").Router();
const invoiceController = require("../controllers/InvoiceController");
const userController = require("../controllers/UserController");
const invoiceDetailController = require("../controllers/InvoiceDetailController");
const vehicleDetailController = require("../controllers/VehicleDetailController");
const paymentController = require("../controllers/PaymentController");
const { uploadImage, multerUpload } = require("../controllers/imageController");

router.get("/users", userController.index);
router.post("/user/register", userController.register);

router.get("/invoice", invoiceController.index);
router.get("/invoice/:id", invoiceController.show);
router.get("/invoice-delivery/:id", invoiceController.showDelivery);
// router.post("/invoice-payment-details", invoiceController.showPayment);
router.post("/invoice", invoiceController.store);
router.put("/invoice/:id", invoiceController.update);
// router.put("/invoice-payment", invoiceController.updatePayment);
router.put("/invoice-delivery", invoiceController.updateDelivery);
router.delete("/invoice/:id", invoiceController.destroy);

router.get("/invoice-detail", invoiceDetailController.index);
router.get("/invoice-detail/:id", invoiceDetailController.show);
router.get("/invoice-detail-item/:id", invoiceDetailController.showItem);
router.post("/invoice-detail", invoiceDetailController.store);
router.put("/invoice-detail/:id", invoiceDetailController.update);
router.delete("/invoice-detail/:id", invoiceDetailController.destroy);
router.delete("/invoice-detail", invoiceDetailController.destroyAll);

router.get("/vehicle-detail", vehicleDetailController.index);
router.get("/vehicle-detail/:id", vehicleDetailController.show);
router.post("/vehicle-detail", vehicleDetailController.store);
router.put("/vehicle-detail/:id", vehicleDetailController.update);
router.delete("/vehicle-detail/:id", vehicleDetailController.destroy);
router.delete("/vehicle-detail", vehicleDetailController.destroyAll);

router.get("/payment", paymentController.index);
router.get("/payment/:id", paymentController.show);
router.post("/payment", paymentController.store);
router.put("/payment/:id", paymentController.update);

router.post("/uploads", multerUpload, uploadImage);
module.exports = router;
