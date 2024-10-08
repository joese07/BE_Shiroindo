const { Payment, Invoice } = require("../models");
const { v4: uuidv4 } = require("uuid");

exports.index = async (req, res) => {
  const payment = await Payment.findAll();
  return res.json(payment);
};

exports.show = async (req, res) => {
  const InvoiceId = req.params.id;

  const payment = await Payment.findOne({
    where: {
      InvoiceId,
    },
  });

  const invoiceDetail = await Invoice.findOne({
    attributes: ["no_invoice", "atas_nama", "kepada", "keterangan"],
    where: {
      id: InvoiceId,
    },
  });

  if (!payment) {
    return res.status(404).json({
      message: "not found",
    });
  }

  return res.json({
    message: "succcess",
    status: 200,
    data: { payment, invoiceDetail },
  });
};

exports.store = async (req, res) => {
  const { InvoiceId, total_tagihan, sisa_tagihan } = req.body;

  if (!InvoiceId || !total_tagihan) {
    return res.status(400).json({
      message: "failed created",
    });
  }

  const cekInvoiceId = await Invoice.findByPk(InvoiceId);

  if (!cekInvoiceId) {
    return res.status(400).json({
      message: "failed created",
    });
  }

  try {
    // const uuid = require("uuid");
    let randomId = uuidv4();

    let cekId = await Payment.findByPk(randomId);

    for (let i = 0; i < cekId; i++) {
      randomId;
    }

    const dataPayment = await Payment.create({
      id: randomId,
      InvoiceId,
      payment: null,
      full_payment_method: null,
      full_payment_date: null,
      full_payment_image: null,
      half_payment_method: null,
      half_payment_date: null,
      half_payment_image: null,
      total_payment: null,
      total_tagihan,
      sisa_tagihan,
      lebih_bayar: null,
    });

    return res.status(200).json({
      message: "created success",
    });
  } catch (err) {
    return res.status(400).json({
      message: "something wrong...",
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const paymentDetail = await Payment.findOne({ where: { InvoiceId: id } });

  if (!paymentDetail) {
    return res.status(404).json({
      message: "data not found",
    });
  }

  const {
    payment,
    full_payment_method,
    full_payment_date,
    full_payment_image,
    half_payment_method,
    half_payment_date,
    half_payment_image,
    total_payment,
    sisa_tagihan,
    lebih_bayar,
  } = req.body;
  if (!payment) {
    return res.status(400).json({
      message: "failed to edit data",
    });
  }
  try {
    updatePaymentDetail = Payment.update(
      {
        payment,
        full_payment_method,
        full_payment_date,
        full_payment_image,
        half_payment_method,
        half_payment_date,
        half_payment_image,
        total_payment,
        sisa_tagihan,
        lebih_bayar,
      },
      {
        where: {
          InvoiceId: id,
        },
      }
    );

    return res.status(200).json({
      message: "edited success",
      data: paymentDetail,
    });
  } catch (error) {
    return res.status(400).json({
      message: "something wrong..." + error,
    });
  }
};
