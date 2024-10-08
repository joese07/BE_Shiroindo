const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const {
  Invoice,
  User,
  Payment,
  VehicleDetaile,
  InvoiceDetail,
} = require("../models");

exports.index = async (req, res) => {
  const invoice = await Invoice.findAll({
    include: [
      {
        model: Payment,
        attributes: ["id", "payment"],
        // through: {
        //   attributes: [],
        // },
      },
    ],
    attributes: [
      "id",
      "no_invoice",
      "atas_nama",
      "keterangan",
      "sub_total_harga",
      "status_pengiriman_bpkb",
      "tgl_penerima_bpkb",
    ],
    order: [["createdAt", "DESC"]],
  });

  return res.json({
    message: "sucess",
    status: 200,
    data: invoice,
  });
};

exports.show = async (req, res) => {
  const id = req.params.id;

  const invoice = await Invoice.findOne({
    include: [
      {
        model: Payment,
      },
      {
        model: InvoiceDetail,
      },
      {
        model: VehicleDetaile,
      },
    ],
    where: {
      id,
    },
  });
  if (!invoice) {
    return res.status(404).json({ message: "data not found" });
  }

  return res.status(200).json({
    message: "sucess",
    status: 200,
    data: invoice,
  });
};

// exports.showPayment = async (req, res) => {
//   const { id } = req.body;

//   const invoice = await Invoice.findAll({
//     attributes: [
//       "id",
//       "no_invoice",
//       "payment",
//       "upload_payment",
//       "tgl_payment",
//     ],
//     where: {
//       id: id,
//     },
//   });
//   if (!invoice) {
//     return res.status(404).json({
//       messag: "data not found",
//     });
//   }

//   return res.status(200).json({
//     message: "success",
//     status: 200,
//     data: invoice,
//   });
// };

exports.store = async (req, res) => {
  const { UserId } = req.body;

  if (!UserId) {
    return res.status(400).json({
      message: "failed to create new data",
    });
  }

  const cekUser = await User.findByPk(UserId);

  if (!cekUser) {
    return res.status(200).json({
      message: "cek user id",
    });
  }

  try {
    // const uuid = require("uuid");
    let randomId = uuidv4();

    let cekId = await Invoice.findByPk(randomId);

    for (let i = 0; i < cekId; i++) {
      randomId;
    }

    const dataInvoice = await Invoice.create({
      id: randomId,
      UserId,
      atas_nama: null,
      kepada: null,
      keterangan: null,
      sub_total_harga: null,
      no_kuitansi: null,
      no_invoice: null,
      nama_pengirim_bpkb: null,
      nama_penerima_bpkb: null,
      tgl_pengiriman_bpkb: null,
      status_pengiriman_bpkb: null,
      tgl_penerima_bpkb: null,
      image_penerima_bpkb: null,
    });

    return res.status(201).json({
      message: "created success",
      data: dataInvoice.id,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Something wrong.." + err,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const invoice = await Invoice.findByPk(id);

  if (!invoice) {
    return res.status(404).json({
      message: "data not found",
    });
  }

  const {
    atas_nama,
    kepada,
    keterangan,
    sub_total_harga,
    no_kuitansi,
    no_invoice,
    nama_pengirim_bpkb,
    nama_penerima_bpkb,
    tgl_pengiriman_bpkb,
    status_pengiriman_bpkb,
    tgl_penerima_bpkb,
    image_penerima_bpkb,
  } = req.body;

  if (!atas_nama || !kepada || !keterangan) {
    return res.status(400).json({
      message: "failed to edit data",
    });
  }

  try {
    updateInvoice = Invoice.update(
      {
        atas_nama,
        kepada,
        keterangan,
        sub_total_harga,
        no_kuitansi,
        no_invoice,
        nama_pengirim_bpkb,
        nama_penerima_bpkb,
        tgl_pengiriman_bpkb,
        status_pengiriman_bpkb,
        tgl_penerima_bpkb,
        image_penerima_bpkb,
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
  } catch (err) {
    return res.status(400).json({
      message: "something wrong..",
    });
  }
};

// exports.updatePayment = async (req, res) => {
//   const { id, payment, upload_payment, tgl_payment } = req.body;

//   const invoice = await Invoice.findByPk(id);

//   if (!invoice) {
//     return res.status(404).json({
//       message: "data not found",
//     });
//   }

//   try {
//     updateInvoicePayment = Invoice.update(
//       {
//         payment,
//         upload_payment,
//         tgl_payment,
//       },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );

//     return res.status(200).json({
//       message: "payment changes success",
//     });
//   } catch (err) {
//     return res.status(400).json({
//       message: "something wrong...",
//     });
//   }
// };

exports.showDelivery = async (req, res) => {
  const id = req.params.id;

  const delivery = await Invoice.findOne({
    where: {
      id: id,
    },
    include: {
      model: VehicleDetaile,
      attributes: ["id", "no_rangka", "no_mesin", "thn_kendaraan", "no_bpkb"],
    },
    attributes: [
      "id",
      "no_invoice",
      "atas_nama",
      "kepada",
      "nama_pengirim_bpkb",
      "nama_penerima_bpkb",
      "tgl_penerima_bpkb",
      "tgl_pengiriman_bpkb",
      "status_pengiriman_bpkb",
      "image_penerima_bpkb",
    ],
  });

  return res.status(200).json({
    message: "success",
    data: delivery,
  });
};

exports.updateDelivery = async (req, res) => {
  const {
    id,
    nama_pengirim_bpkb,
    nama_penerima_bpkb,
    tgl_penerima_bpkb,
    tgl_pengiriman_bpkb,
    status_pengiriman_bpkb,
    image_penerima_bpkb,
  } = req.body;

  const invoice = await Invoice.findByPk(id);

  if (!invoice) {
    return res.status(404).json({
      message: "data not found",
    });
  }

  try {
    updateInvoiceDelivery = Invoice.update(
      {
        nama_pengirim_bpkb,
        nama_penerima_bpkb,
        tgl_penerima_bpkb,
        tgl_pengiriman_bpkb,
        status_pengiriman_bpkb,
        image_penerima_bpkb,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(200).json({
      message: "change status delivery success",
    });
  } catch (err) {
    return res.status(400).json({
      message: "something wrong...",
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req.params.id;

  const invoice = await Invoice.findByPk(id);

  if (!invoice) {
    return res.status(404).json({
      message: "data not found",
    });
  }

  await invoice.destroy();
  return res.status(200).json({
    message: "deleted sucess",
  });
};
