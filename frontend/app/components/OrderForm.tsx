"use client";

import React, { useState } from "react";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    itemName: "",
    phone1: "",
    phone2: "",
    address: "",
    price: "",
    prepayment: "",
    passportSeries: "",
    dueDate: "",
    description: "",
    images: [],
  });

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const imageFormData = new FormData();
      imageFormData.append("file", e.target.files[0]);

      try {
        const result = await fetch(`${process.env.BACKEND_URL}/files`, {
          method: "POST",
          body: imageFormData,
        });

        const data = await result.json();
        setFormData({
          ...formData,
          images: [...formData.images, data.fileName],
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          dueDate: new Date(formData.dueDate),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully", data);
      } else {
        console.error("Form submission failed", await response.json());
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center w-full  min-h-screen bg-white px-5 py-5">
        <div className="xl:max-w-7xl bg-white drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
          <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
            <h1 className="text-center text-2xl sm:text-3xl font-semibold text-black">
              Оформление заказа
            </h1>
            <div className="w-full mt-5 sm:mt-8">
              <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5 bg-white">
                <input
                  id="fullName"
                  type="text"
                  placeholder="ФИО Заказчика"
                  onChange={handleChange}
                  className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                />
                <input
                  id="itemName"
                  type="text"
                  placeholder="Название изделия"
                  onChange={handleChange}
                  className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="phone1"
                    type="text"
                    placeholder="Телефон 1"
                    onChange={handleChange}
                    className="input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70"
                  />
                  <input
                    id="phone2"
                    type="text"
                    placeholder="Телефон 2"
                    onChange={handleChange}
                    className="input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70"
                  />
                </div>
                <input
                  id="address"
                  type="text"
                  placeholder="Адрес доставки"
                  onChange={handleChange}
                  className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="price"
                    type="text"
                    onChange={handleChange}
                    placeholder="Цена"
                    className="input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70"
                  />
                  <input
                    id="prepayment"
                    type="text"
                    onChange={handleChange}
                    placeholder="Задаток"
                    className="input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="passportSeries"
                    type="text"
                    placeholder="Серия паспорта"
                    onChange={handleChange}
                    className="input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70"
                  />
                  <p className="text-black">Выплата до</p>
                  <input
                    id="dueDate"
                    type="date"
                    placeholder="Выплата до"
                    onChange={handleChange}
                    className="input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70"
                  />
                </div>
                <input
                  id="description"
                  type="text"
                  onChange={handleChange}
                  placeholder="Описание заказа"
                  className="input large-input input-bordered input-primary w-full text-black placeholder:text-black/70"
                />

                <div className="flex items-center gap-1.5  justify-start pl-2">
                  <div>
                    <h2 className="text-black mb-3">Добавить изображения:</h2>
                    <input type="file" onChange={handleImageChange} />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                  <button
                    type="submit"
                    className="btn btn-outline btn-primary btn-block max-w-[200px]"
                  >
                    Создать заказ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;
