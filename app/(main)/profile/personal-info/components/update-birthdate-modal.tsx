// import moment from "moment";
import moment from "moment-jalaali";
import View from "@/components/ui/view";
import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import { e2p, p2e } from "@/utils/numbers";
import Button from "@/components/ui/button";
import { useUserStore } from "@/store/user-store";
import { useToast } from "react-native-toast-notifications";
import DropdownPicker from "@/components/ui/dropdown-picker";
import axiosInstance from "@/libs/axios";
import { AxiosError } from "axios";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateBirthDateModal = ({ open, setOpen }: Props) => {
  const { setUser, user } = useUserStore();

  const toast = useToast();
  const [loading, setLoading] = useState(false);

  // @BIRTH DATE VALUES
  // YEARS
  const currentYear = Intl.DateTimeFormat("fa", {
    calendar: "persian",
    year: "numeric",
  }).format();

  const [year, setYear] = useState(user?.birth_date ? moment(user?.birth_date).jYear() : null);
  let years = [];
  for (let i = +p2e(currentYear) - 2; i > +p2e(currentYear) - 110; i--) {
    years.push({ value: i, label: e2p(i) });
  }

  // MONTHS
  const [month, setMonth] = useState(user?.birth_date ? moment(user.birth_date).jMonth() : null);

  const months = [
    { label: "فروردین", value: 0 },
    { label: "اردیبهشت", value: 1 },
    { label: "خرداد", value: 2 },
    { label: "تیر", value: 3 },
    { label: "مرداد", value: 4 },
    { label: "شهریور", value: 5 },
    { label: "مهر", value: 6 },
    { label: "آبان", value: 7 },
    { label: "آذر", value: 8 },
    { label: "دی", value: 9 },
    { label: "بهمن", value: 10 },
    { label: "اسفند", value: 11 },
  ];

  // DAYS
  const [day, setDay] = useState(user?.birth_date ? moment(user.birth_date).jDate() : null);
  const days =
    month !== null && year !== null
      ? [...Array(moment.jDaysInMonth(year, month))].map((_, i) => ({
          label: e2p(i + 1),
          value: i + 1,
        }))
      : [];

  // DROPDOWNS
  const [openDay, setOpenDay] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);
  const [openYear, setOpenYear] = useState(false);

  const onSubmit = () => {
    if (day === null || month === null || year === null) {
      toast.show("تمام مقادیر را وارد کنید", { type: "error" });
      return;
    }

    const enDate = moment(`${year}/${month + 1}/${day}`, "jYYYY/jMM/jDD").format("YYYY-MM-DD");

    setLoading(true);
    axiosInstance
      .put("/api/v1/users/edit-birth-date", { date: enDate })
      .then((res) => {
        toast.show("تاریخ تولد با موفقیت ثبت شد", { type: "success" });
      })
      .catch((err: AxiosError<{ message: string }>) => {
        toast.show(err.response?.data?.message || err.message, { type: "error" });
      })
      .finally(() => {
        setOpen(false);
        setLoading(false);
      });
  };

  return (
    <Modal hasScrollView={false} open={open} setOpen={setOpen} title="تاریخ تولد">
      <View className="mt-6">
        <View style={{ gap: 25 }} className="">
          {/* DAY */}
          <DropdownPicker
            label="روز"
            disabled={month === null || year === null}
            value={day}
            setValue={setDay}
            items={days}
            open={openDay}
            setOpen={setOpenDay}
            placeholder="روز تولدتان را انتخاب نمایید"
          />

          {/* MONTH */}
          <DropdownPicker
            label="ماه"
            items={months}
            open={openMonth}
            value={month}
            setValue={setMonth}
            setOpen={setOpenMonth}
            placeholder="ماه تولدتان را انتخاب نمایید"
          />

          {/* YEARS */}
          <DropdownPicker
            dropDownDirection="TOP"
            label="سال"
            items={years}
            open={openYear}
            value={year}
            setValue={setYear}
            setOpen={setOpenYear}
            placeholder="سال تولدتان را انتخاب نمایید"
          />
        </View>
      </View>

      <View className="mt-5">
        <Button size="base" onPress={onSubmit} loading={loading}>
          ثبت
        </Button>
      </View>
    </Modal>
  );
};

export default UpdateBirthDateModal;
