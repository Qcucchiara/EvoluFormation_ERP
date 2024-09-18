"use client";
import axios from "axios";

export const backend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,

  headers: {
    "content-type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    Authorization: `Bearer ${typeof window !== "undefined" && window.localStorage.getItem("token")}`,
  },
});

// export const handleAuth = {
//   register: async (form: unknown, refFile: any) => {
//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };
//     const data = new FormData();

//     data.append("avatar", await refFile.current.files[0]);

//     return backend.post("/auth/signup", data, config);
//   },
//   login: (data: unknown) => {
//     return backend.post("/auth/signin", data);
//   },
// };

export const handlePerson = {
  prospect: {
    create: (data: unknown) => {
      return backend.post("/prospect", data);
    },
    // skip: number, take: number
    findAll: () => {
      return backend.get(`/prospect`);
    },
    findOne: (id: string) => {
      return backend.get(`/prospect/${id}`);
    },
    update: (id: string, data: unknown) => {
      return backend.patch(`/prospect/${id}`, data);
    },
    remove: (id: string) => {
      return backend.delete(`/prospect/${id}`);
    },
  },
  trainer: {
    create: (data: unknown) => {
      return backend.post("/trainer", data);
    },
    // skip: number, take: number
    findAll: () => {
      return backend.get(`/trainer`);
    },
    findOne: (id: string) => {
      return backend.get(`/trainer/${id}`);
    },
    update: (id: string, data: unknown) => {
      return backend.patch(`/trainer/${id}`, data);
    },
    remove: (id: string) => {
      return backend.delete(`/trainer/${id}`);
    },
  },
  student: {
    create: (data: unknown) => {
      return backend.post("/student", data);
    },
    // skip: number, take: number
    findAll: () => {
      return backend.get(`/student`);
    },
    findOne: (id: string) => {
      return backend.get(`/student/${id}`);
    },
    update: (id: string, data: unknown) => {
      return backend.patch(`/student/${id}`, data);
    },
    remove: (id: string) => {
      return backend.delete(`/student/${id}`);
    },
  },
};
