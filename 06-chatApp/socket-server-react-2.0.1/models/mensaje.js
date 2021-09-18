const { Schema, model, SchemaType } = require("mongoose");

const MensajeSchema = Schema(
  {
    de: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    para: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    mensaje: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
MensajeSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});
//mongoose le coloca a la coleccion en plural
module.exports = model("Mensaje", MensajeSchema);
