const { VehicleDetaile, Invoice } = require("../models");

exports.index = async (req, res) => {
  const vehicleDetail = await VehicleDetaile.findAll();
  return res.json(vehicleDetail);
};

exports.show = async (req, res) => {
  const id = req.params.id;

  const vehicleDetail = await VehicleDetaile.findByPk(id);

  return res.json({ message: "success", data: vehicleDetail });
};

exports.store = async (req, res) => {
  const { invoiceId, no_rangka, no_mesin, thn_kendaraan } = req.body;

  if (!invoiceId || !no_rangka || !no_mesin || !thn_kendaraan) {
    return res.status(400).json({
      message: "failed created",
    });
  }

  const cekInvoiceId = await Invoice.findByPk(invoiceId);

  if (!cekInvoiceId) {
    return res.status(400).json({
      message: "failed created",
    });
  }
  try {
    const uuid = require("uuid");
    let randomId = uuid.v4();

    let cekId = await VehicleDetaile.findByPk(randomId);

    for (let i = 0; i < cekId; i++) {
      randomId;
    }

    const dataVehicleDetail = await VehicleDetaile.create({
      id: randomId,
      InvoiceId: invoiceId,
      no_rangka,
      no_mesin,
      thn_kendaraan,
    });

    const allVehicleDetail = await VehicleDetaile.findAll({
      where: {
        InvoiceId: invoiceId,
      },
    });

    return res.status(200).json({
      message: "created success",
      data: allVehicleDetail,
    });
  } catch (err) {
    return res.status(400).json({
      message: "something wrong..." + err,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const vehicleDetail = await VehicleDetaile.findByPk(id);

  if (!vehicleDetail) {
    return res.status(404).json({
      message: "not found",
    });
  }

  const { no_rangka, no_mesin, thn_kendaraan, no_bpkb } = req.body;
  if (!no_mesin) {
    return res.status(400).json({
      message: "failed to edit data",
    });
  }

  try {
    updateVehicleDetail = await VehicleDetaile.update(
      {
        no_mesin,
        no_rangka,
        thn_kendaraan,
        no_bpkb,
      },
      {
        where: {
          id: id,
        },
      }
    );

    const allVehicleDetail = await VehicleDetaile.findAll({
      where: {
        InvoiceId: vehicleDetail.dataValues.InvoiceId,
      },
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).json({
      message: "edited success",
      data: allVehicleDetail,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something wrong..",
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req.params.id;

  const vehicleDetail = await VehicleDetaile.findByPk(id);
  // console.log(invoiceDetail.dataValues.InvoiceId);

  if (!vehicleDetail) {
    return res.status(404).json({
      message: "data not found",
    });
  }

  await vehicleDetail.destroy();

  const allVehicleDetail = await VehicleDetaile.findAll({
    where: {
      InvoiceId: vehicleDetail.dataValues.InvoiceId,
    },
  });

  return res.status(200).json({
    message: "delete success",
    data: allVehicleDetail,
  });
};

exports.destroyAll = async (req, res) => {
  const { invoiceId } = req.body;

  await VehicleDetaile.destroy({
    where: { InvoiceId: invoiceId },
  });

  return res.status(200).json({
    message: "delete success",
    data: invoiceId,
  });
};
