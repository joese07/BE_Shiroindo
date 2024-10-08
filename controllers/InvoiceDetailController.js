const { InvoiceDetail, Invoice } = require("../models");

exports.index = async (req, res) => {
  const invoieDetail = await InvoiceDetail.findAll();
  return res.json(invoieDetail);
};

exports.showItem = async (req, res) => {
  const id = req.params.id;

  const invoiceDetail = await InvoiceDetail.findByPk(id);

  return res.json({ message: "success", data: invoiceDetail });
};

exports.show = async (req, res) => {
  const idInvoice = req.params.id;

  const invoiceDetail = await InvoiceDetail.findAll({
    where: {
      InvoiceId: idInvoice,
    },
  });

  if (!invoiceDetail) {
    return res.status(404).json({
      message: "not found",
    });
  }

  return res.json(invoiceDetail);
};

exports.store = async (req, res) => {
  const { InvoiceId, item, kuantitas, harga_satuan, total_harga } = req.body;

  if (!InvoiceId) {
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
    const uuid = require("uuid");
    let randomId = uuid.v4();

    let cekId = await InvoiceDetail.findByPk(randomId);

    for (let i = 0; i < cekId; i++) {
      randomId;
    }

    const dataInvoiceDetail = await InvoiceDetail.create({
      id: randomId,
      InvoiceId,
      item,
      kuantitas,
      harga_satuan,
      total_harga,
    });

    const allInvoiceDetail = await InvoiceDetail.findAll({
      where: {
        InvoiceId,
      },
    });

    return res.status(200).json({
      message: "created success",
      data: allInvoiceDetail,
    });
  } catch (err) {
    return res.status(400).json({
      message: "something wrong...",
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const invoiceDetail = await InvoiceDetail.findByPk(id);

  if (!invoiceDetail) {
    return res.status(404).json({
      message: "data not found",
    });
  }

  const { item, kuantitas, harga_satuan, total_harga } = req.body;

  if (!item) {
    return res.status(400).json({
      message: "failed to edit data",
    });
  }

  try {
    updateInvoiceDetail = InvoiceDetail.update(
      {
        item,
        kuantitas,
        harga_satuan,
        total_harga,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      message: "edited success",
    });
  } catch (error) {
    return res.status(400).json({
      message: "something wrong...",
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req.params.id;

  const invoiceDetail = await InvoiceDetail.findByPk(id);
  // console.log(invoiceDetail.dataValues.InvoiceId);

  if (!invoiceDetail) {
    return res.status(404).json({
      message: "data not found",
    });
  }

  await invoiceDetail.destroy();

  const allInvoiceDetail = await InvoiceDetail.findAll({
    where: {
      InvoiceId: invoiceDetail.dataValues.InvoiceId,
    },
  });

  return res.status(200).json({
    message: "delete success",
    data: allInvoiceDetail,
  });
};

exports.destroyAll = async (req, res) => {
  const { invoiceId } = req.body;

  // const invoiceDetail = await InvoiceDetail.findAll({
  //   where: {
  //     InvoiceId: invoiceId,
  //   },
  // });

  console.log(invoiceId);

  // console.log(invoiceDetail.dataValues.InvoiceId);

  // if (!invoiceDetail) {
  //   return res.status(404).json({
  //     message: "data not found",
  //   });
  // }

  await InvoiceDetail.destroy({
    where: { InvoiceId: invoiceId },
  });

  return res.status(200).json({
    message: "delete success",
    data: invoiceId,
  });
};
