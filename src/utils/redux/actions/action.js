// aksi dinamis
export function reduxAction(type, payload) {
  return { type, payload };
}

// aksi statis
export const startAction = {
  type: "rotate",
  payload: true,
};

/*
fungsi dari file actions ini adalah untuk melakukan
sebuah aksi yang akan dijalankan oleh redux
*/
