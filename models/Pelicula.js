/// <reference types="mongoose" />

import mongoose from "mongoose";

const peliculasSchema = mongoose.Schema(
  {
    imdbID: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    año: {
      type: String,
      required: true,
    },
    valoracion: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Pelicula = mongoose.model("Pelicula", peliculasSchema);

export default Pelicula;
