import React from "react";
import { S } from "./consultationStyles";

function convertToMinutes(slot) {
if (!slot) return 0;

const startTime =
slot.includes("-")
? slot.split("-")[0].trim()
: slot.trim();

const parts = startTime.split(" ");

const time = parts[0];
const modifier = parts[1];

let hours = 0;
let minutes = 0;

if (time.includes(":")) {
[hours, minutes] = time.split(":").map(Number);
} else {
hours = Number(time);
minutes = 0;
}

if (modifier?.toUpperCase() === "PM" && hours !== 12) {
hours += 12;
}

if (modifier?.toUpperCase() === "AM" && hours === 12) {
hours = 0;
}

return hours * 60 + minutes;
}

export default function SlotGrid({
slots = [],
selectedSlot,
onSelect,
selectedDate,
}) {
const now = new Date();

const currentMinutes =
now.getHours() * 60 + now.getMinutes();

const selectedDateObj = selectedDate
? new Date(selectedDate)
: null;

const isToday =
selectedDateObj &&
selectedDateObj.toDateString() ===
now.toDateString();

return ( <div style={S.slotGrid}>
{slots.map((slotObj) => {
const slot =
typeof slotObj === "string"
? slotObj
: slotObj.slot;

    const isPastSlot =
      isToday &&
      convertToMinutes(slot) < currentMinutes;

    const active =
      selectedSlot === slot;

    return (
      <div
        key={slot}
        onClick={() => {
          if (!isPastSlot) {
            onSelect(slot);
          }
        }}
        style={{
          ...S.slotCard,
          ...(active ? S.slotActive : {}),
          ...(isPastSlot ? S.slotBooked : {}),
        }}
      >
        {slot}

        {isPastSlot && (
          <div
            style={{
              fontSize: ".65rem",
              marginTop: 3,
            }}
          >
            Expired
          </div>
        )}
      </div>
    );
  })}
</div>
);
}
