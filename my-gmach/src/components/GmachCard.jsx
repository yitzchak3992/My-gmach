import React, { useContext } from "react";
import { Star, MapPin, Wrench, Phone, MessageSquare } from "lucide-react";
import { modalContext } from "./GmachList";
import { Fab, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';


const GmachCard = ({ gmach }) => {
  const { setOpenModal, setModalContent } = useContext(modalContext);

  return (
    <div
      onClick={() => {
        setOpenModal(true);
        setModalContent(gmach);
      }}
      className="border border-primary bg-#FDFEFE rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow"
    >
      {/* מיקום וקטגוריה */}
      <div className="flex flex-wrap gap-4 mb-3">
        <div className="flex items-center gap-1 text-gray-600">
          <Wrench className="w-4 h-4" />
          <span className="text-sm">{gmach.category}</span>
        </div>
      </div>

      {/* Header - שם וציון */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold text-secondary">{gmach.name}</h3>
        <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
          <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
          <span className="text-sm font-medium">{gmach.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-gray-600">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">
          {gmach.city}, {gmach.address}
        </span>
      </div>

      {/* פרטי התקשרות */}
      <div className="flex gap-4 mb-3">
        {gmach.phone && (
          <div className="flex items-center gap-1 text-gray-600">
            <Phone className="w-4 h-4" />
            <span className="text-sm" dir="ltr">
              {gmach.phone}
            </span>
          </div>
        )}
        {gmach.WhatsAppNumber && (
          <div className="flex items-center gap-1 text-green-600">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span className="text-sm" dir="ltr">
              {gmach.WhatsAppNumber}
            </span>
          </div>
        )}
      </div>

      {/* פריטים זמינים */}
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-gray-700 mb-1">
          פריטים זמינים:
        </h4>
        <p className="text-gray-600 text-sm">{gmach.description}</p>
      </div>

      {/* מידע חשוב */}
      {/* <div className="mb-3 bg-yellow-50 p-3 rounded">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-yellow-600 mt-1" />
          <p className="text-sm text-gray-700">{gmach.information}</p>
        </div>
      </div> */}

      {/* מספר תגובות */}
      {gmach.reviews && gmach.reviews.length > 0 && (
        <div className="flex items-center gap-1 text-gray-600">
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm">{gmach.reviews.length} תגובות</span>
        </div>
      )}
        {/* <Box display="flex" justifyContent="flex-end">
          <Fab 
            color="secondary"
            aria-label="edit"
            onClick={(e) => e.stopPropagation()} // Prevent the click event from propagating to the parent component
          >
              <EditIcon />
          </Fab>
        </Box> */}
    </div>
  );
};

export default GmachCard;
