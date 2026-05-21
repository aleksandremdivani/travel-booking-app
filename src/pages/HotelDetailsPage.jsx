import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { DestinationsContext } from "../context/DestinationsContext";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const HotelDetailsPage = () => {
  const [hotelData, setHotelData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const { id } = useParams();
  const {
    mergedHotels,
    dateRange,
    selectedRooms,
    setSelectedRooms,
    handleRoomSelection,
  } = useContext(DestinationsContext);
  const savedCurrentHotel = sessionStorage.getItem("currentHotel");
  const parsed = JSON.parse(savedCurrentHotel);
  const currentHotel =
    parsed?.hotelId === id
      ? parsed
      : mergedHotels?.find((i) => i.hotelId === id);
  const navigate = useNavigate();
  const cappedImages = hotelData?.hotelImages?.slice(0, 8);
  const images = hotelData?.hotelImages;
  const extraCount = (images?.length || 0) - 8;

  useEffect(() => {
    sessionStorage.setItem("currentHotel", JSON.stringify(currentHotel));
  }, [currentHotel]);

  useEffect(() => {
    console.log(selectedRooms);
  }, [selectedRooms]);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(
          "https://api.liteapi.travel/v3.0/data/hotel",
          {
            params: { hotelId: id },
            headers: { "X-API-Key": import.meta.env.VITE_LITEAPI_KEY },
          },
        );
        setHotelData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHotelDetails();
  }, [id]);
  // console.log("drooms:", hotelData?.rooms);
  // const mergedRooms = useMemo(() => {
  //   const roomData = currentHotel?.roomTypes?.map((h) => ({
  //     ...h,
  //     roomDetail: hotelData?.rooms?.find((i) => i.id === h.roomTypeId),
  //   }));
  //   return roomData;
  // }, [currentHotel, hotelData]);
  // console.log("rooms:", mergedRooms);
  // console.log(currentHotel);
  const cheapestPrice = useMemo(() => {
    if (!currentHotel?.roomTypes?.length) return null;
    return Math.min(
      ...currentHotel?.roomTypes.map(
        (r) => r.rates?.[0]?.retailRate?.total?.[0]?.amount || Infinity,
      ),
    );
  }, [currentHotel?.roomTypes]);

  const facilities = showAllFacilities
    ? hotelData?.hotelFacilities
    : hotelData?.hotelFacilities?.slice(0, 12);

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  if (!hotelData) {
    return (
      <div style={s.loadingScreen}>
        <style>{css}</style>
        <div style={s.loadingInner}>
          <div style={s.loadingDot} className="pulse-dot" />
          <span style={s.loadingText}>Loading property details</span>
        </div>
      </div>
    );
  }

  const stars = Array.from({ length: hotelData.starRating || 0 });
  return (
    <div style={s.page}>
      <style>{css}</style>
      <div className="w-full h-20 p-5">
        <button className="hover:text-blue-500" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {/* GALLERY */}
      <div className="fade-up" style={{ padding: "24px 24px 0" }}>
        <div style={s.galleryGrid}>
          <div style={s.bigPhoto} onClick={() => setIsModalOpen(true)}>
            <img
              src={hotelData.main_photo}
              alt={hotelData.name}
              style={s.galleryImgFull}
              className="gallery-img"
            />
            <div style={s.bigPhotoOverlay}>
              {stars.map((_, i) => (
                <span key={i} style={s.starGold}>
                  ★
                </span>
              ))}
            </div>
          </div>

          {cappedImages?.map((item, i) => (
            <div
              key={item.url}
              style={s.smallPhoto}
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={item.url}
                alt="hotel"
                style={s.galleryImgFull}
                className="gallery-img"
              />
            </div>
          ))}

          <div style={s.overlayCell} onClick={() => setIsModalOpen(true)}>
            <span style={s.overlayCellPlus}>
              +{extraCount > 0 ? extraCount : images?.length}
            </span>
            <span style={s.overlayCellLabel}>photos</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={s.contentWrapper}>
        {/* LEFT */}
        <div style={s.leftCol}>
          {/* Header */}
          <div style={s.hotelHeader} className="fade-up-1">
            <div style={s.locationLine}>
              <span style={s.locationDot}>◆</span>
              <span style={s.locationText}>
                {hotelData.city}, {hotelData.country?.toUpperCase()}
              </span>
            </div>
            <h1 style={s.hotelName}>{hotelData.name}</h1>
            <p style={s.hotelAddress}>{hotelData.address}</p>
            <div style={s.metaRow}>
              <div style={s.checkinBadge}>
                <span style={s.checkinLabel}>Check-in</span>
                <span style={s.checkinVal}>
                  {hotelData.checkinCheckoutTimes?.checkin || "3:00 PM"}
                </span>
              </div>
              <div style={s.divider} />
              <div style={s.checkinBadge}>
                <span style={s.checkinLabel}>Check-out</span>
                <span style={s.checkinVal}>
                  {hotelData.checkinCheckoutTimes?.checkout || "12:00 PM"}
                </span>
              </div>
            </div>
          </div>

          <div style={s.sectionDivider} />

          {/* Description */}
          <div style={s.section} className="fade-up-2">
            <h2 style={s.sectionTitle}>About this property</h2>
            <div
              style={s.description}
              dangerouslySetInnerHTML={{ __html: hotelData.hotelDescription }}
            />
          </div>

          <div style={s.sectionDivider} />

          {/* Facilities */}
          {hotelData.hotelFacilities?.length > 0 && (
            <div style={s.section} className="fade-up-2">
              <h2 style={s.sectionTitle}>Facilities</h2>
              <div style={s.facilitiesGrid}>
                {facilities?.map((f, i) => (
                  <span
                    key={i}
                    style={s.facilityPill}
                    className="facility-pill"
                  >
                    {f}
                  </span>
                ))}
              </div>
              {hotelData.hotelFacilities.length > 12 && (
                <button
                  style={s.showMoreBtn}
                  className="show-more-btn"
                  onClick={() => setShowAllFacilities(!showAllFacilities)}
                >
                  {showAllFacilities
                    ? "Show less ↑"
                    : `Show ${hotelData.hotelFacilities.length - 12} more ↓`}
                </button>
              )}
            </div>
          )}

          <div style={s.sectionDivider} />

          {/* Sentiment */}
          {hotelData.sentiment_analysis && (
            <div style={s.section} className="fade-up-3">
              <h2 style={s.sectionTitle}>Guest sentiment</h2>
              <div style={s.sentimentGrid}>
                <div style={s.prosCard}>
                  <div style={s.sentimentHeader}>
                    <span style={s.prosIcon}>↑</span>
                    <span style={s.prosLabel}>Highlights</span>
                  </div>
                  {hotelData.sentiment_analysis.pros
                    ?.slice(0, 4)
                    .map((p, i) => (
                      <p key={i} style={s.sentimentItem}>
                        {p}
                      </p>
                    ))}
                </div>
                <div style={s.consCard}>
                  <div style={s.sentimentHeader}>
                    <span style={s.consIcon}>↓</span>
                    <span style={s.consLabel}>Consider</span>
                  </div>
                  {hotelData.sentiment_analysis.cons
                    ?.slice(0, 4)
                    .map((c, i) => (
                      <p key={i} style={s.sentimentItem}>
                        {c}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          )}

          <div style={s.sectionDivider} />

          {/* Rooms */}
          <div style={s.section} className="fade-up-4" id="rooms-section">
            <h2 style={s.sectionTitle}>Available rooms</h2>
            <div style={s.roomsList}>
              {currentHotel?.roomTypes?.map((room, i) => {
                const price = room.rates?.[0]?.retailRate?.total?.[0]?.amount;
                const photo = hotelData?.main_photo;
                const name =
                  room.roomDetail?.roomName || room.rates?.[0]?.name || "Room";
                const board = room.rates?.[0]?.boardName;
                const existingHotel = selectedRooms.find(
                  (i) => i.id === hotelData.id,
                );
                const isSelected = existingHotel?.selectedRooms?.find(
                  (r) => r.roomTypeId === room.roomTypeId,
                );

                return (
                  <div key={i} style={s.roomCard} className="room-card-hover">
                    <div style={s.roomPhotoWrap}>
                      {photo ? (
                        <img src={photo} alt={name} style={s.roomPhoto} />
                      ) : (
                        <div style={s.roomPhotoPlaceholder}>
                          <span style={{ color: "#444", fontSize: 12 }}>
                            No photo
                          </span>
                        </div>
                      )}
                    </div>
                    <div style={s.roomInfo}>
                      <h3 style={s.roomName}>{name}</h3>
                      {board && <p style={s.roomBoard}>{board}</p>}
                    </div>
                    <div style={s.roomPriceCol}>
                      {price && (
                        <>
                          <span style={s.roomPrice}>{formatPrice(price)}</span>
                          <span style={s.roomPriceNight}>/ night</span>
                        </>
                      )}
                      <button
                        style={s.bookBtn}
                        onClick={() =>
                          handleRoomSelection(
                            room,
                            hotelData,
                            dateRange[0],
                            dateRange[1],
                          )
                        }
                        className="book-btn"
                      >
                        {isSelected ? "Cancel" : "Book Now"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Important info */}
          {hotelData.hotelImportantInformation && (
            <>
              <div style={s.sectionDivider} />
              <div style={s.section}>
                <h2 style={s.sectionTitle}>Important information</h2>
                <div
                  style={s.importantInfo}
                  dangerouslySetInnerHTML={{
                    __html: hotelData.hotelImportantInformation,
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* RIGHT — STICKY CARD */}
        <div style={s.rightCol}>
          <div style={s.stickyCard} className="fade-up-1">
            <div style={s.stickyTop}>
              <span style={s.stickyFrom}>from</span>
              <span style={s.stickyPrice}>
                {cheapestPrice ? formatPrice(cheapestPrice) : "—"}
              </span>
              <span style={s.stickyNight}>/ night</span>
            </div>

            {dateRange?.[0] && dateRange?.[1] && (
              <div style={s.datesRow}>
                <div style={s.dateCell}>
                  <span style={s.dateCellLabel}>Check-in</span>
                  <span style={s.dateCellVal}>
                    {new Date(dateRange[0]).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div style={s.dateSep}>→</div>
                <div style={s.dateCell}>
                  <span style={s.dateCellLabel}>Check-out</span>
                  <span style={s.dateCellVal}>
                    {new Date(dateRange[1]).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            )}

            <button
              style={s.mainBookBtn}
              className="book-btn"
              onClick={() =>
                document
                  .getElementById("rooms-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Select a room
            </button>

            {hotelData.policies?.slice(0, 3).map((p, i) => (
              <div key={i} style={s.policyRow}>
                <span style={s.policyDot}>◆</span>
                <span style={s.policyText}>
                  {p.name}: {p.description}
                </span>
              </div>
            ))}

            <div style={s.stickyFooter}>
              <span style={s.stickyFooterText}>
                No booking fees · Instant confirmation
              </span>
            </div>

            {selectedRooms.length > 0 && (
              <div className="flex justify-center p-2">
                <button
                  onClick={() => navigate("/booking")}
                  className="flex gap-1 text-blue-400 hover:text-blue-500"
                >
                  Proceed to booking <ArrowBigRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div style={s.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div style={s.modalInner} onClick={(e) => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <h3 style={s.modalTitle}>{hotelData.name}</h3>
              <button
                style={s.closeBtn}
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: "0 0 16px" }}>
              <Slider
                dots={false}
                infinite={true}
                speed={400}
                slidesToShow={1}
                slidesToScroll={1}
                arrows={true}
              >
                {images?.map((img, i) => (
                  <div className="relative" key={i}>
                    <img src={img.url} alt="hotel" style={s.modalBigImg} />
                    <p className="absolute bottom-3 left-7">
                      {i + 1} of {images.length}
                    </p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const gold = "#c9a96e";
const bg = "#0a0a0a";
const surface = "#111111";
const surface2 = "#161616";
const border = "#222222";
const textPrimary = "#f0ece4";
const textSecondary = "#888888";
const textMuted = "#555555";
const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'DM Sans', system-ui, sans-serif";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  .gallery-img { transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94); cursor: pointer; }
  .gallery-img:hover { transform: scale(1.04); }
  .room-card-hover { transition: border-color 0.25s, transform 0.25s; cursor: pointer; }
  .room-card-hover:hover { border-color: ${gold} !important; transform: translateY(-2px); }
  .facility-pill { transition: background 0.2s, color 0.2s; }
  .facility-pill:hover { background: ${gold} !important; color: ${bg} !important; }
  .book-btn { transition: background 0.2s, transform 0.15s; }
  .book-btn:hover { background: #e8c07e !important; transform: translateY(-1px); }
  .book-btn:active { transform: translateY(0); }
  .modal-thumb { transition: border-color 0.2s, opacity 0.2s; cursor: pointer; }
  .modal-thumb:hover { opacity: 0.8; }
  .modal-nav { transition: background 0.2s; cursor: pointer; }
  .modal-nav:hover { background: rgba(201,169,110,0.2) !important; }
  .show-more-btn { transition: color 0.2s; cursor: pointer; background: none; border: none; }
  .show-more-btn:hover { color: #e8c07e !important; }
  .close-btn { transition: background 0.2s; cursor: pointer; }
  .close-btn:hover { background: rgba(255,255,255,0.15) !important; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
  .pulse-dot { animation: pulse 1.5s ease-in-out infinite; }
  .fade-up { animation: fadeUp 0.6s ease forwards; }
  .fade-up-1 { animation: fadeUp 0.6s 0.1s ease both; }
  .fade-up-2 { animation: fadeUp 0.6s 0.2s ease both; }
  .fade-up-3 { animation: fadeUp 0.6s 0.3s ease both; }
  .fade-up-4 { animation: fadeUp 0.6s 0.4s ease both; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #111; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
  .slick-dots li button:before { color: #c9a96e !important; }
.slick-dots li.slick-active button:before { color: #c9a96e !important; opacity: 1 !important; }
.slick-dots { bottom: -30px; }
.slick-dots li { margin: 0 2px; }
`;

const s = {
  page: {
    background: bg,
    minHeight: "100vh",
    fontFamily: sans,
    color: textPrimary,
  },
  loadingScreen: {
    background: bg,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingInner: { display: "flex", alignItems: "center", gap: 12 },
  loadingDot: { width: 8, height: 8, borderRadius: "50%", background: gold },
  loadingText: {
    fontFamily: sans,
    color: textSecondary,
    fontSize: 14,
    letterSpacing: "0.1em",
  },

  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(5, 120px)",
    gap: 3,
    width: "100%",
  },
  bigPhoto: {
    gridColumn: "span 4",
    gridRow: "span 4",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
  },
  smallPhoto: { overflow: "hidden", position: "relative" },
  galleryImgFull: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
  },
  bigPhotoOverlay: {
    position: "absolute",
    bottom: 16,
    left: 16,
    display: "flex",
    gap: 2,
  },
  starGold: { color: gold, fontSize: 14 },
  overlayCell: {
    background: surface2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderLeft: `3px solid ${gold}`,
  },
  overlayCellPlus: {
    fontSize: 22,
    fontWeight: 300,
    color: gold,
    fontFamily: serif,
    lineHeight: 1,
  },
  overlayCellLabel: {
    fontSize: 11,
    color: textSecondary,
    letterSpacing: "0.1em",
    marginTop: 2,
  },

  contentWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: 40,
    maxWidth: 1200,
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
  leftCol: { minWidth: 0 },
  rightCol: { position: "relative" },

  hotelHeader: { paddingBottom: 32 },
  locationLine: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  locationDot: { color: gold, fontSize: 8 },
  locationText: {
    fontSize: 12,
    letterSpacing: "0.15em",
    color: textSecondary,
    textTransform: "uppercase",
  },
  hotelName: {
    fontFamily: serif,
    fontSize: 42,
    fontWeight: 300,
    lineHeight: 1.15,
    color: textPrimary,
    marginBottom: 8,
    fontStyle: "italic",
  },
  hotelAddress: { fontSize: 14, color: textSecondary, marginBottom: 20 },
  metaRow: { display: "flex", alignItems: "center", gap: 20, marginTop: 8 },
  checkinBadge: { display: "flex", flexDirection: "column", gap: 2 },
  checkinLabel: {
    fontSize: 11,
    color: textMuted,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  checkinVal: { fontSize: 14, color: textPrimary },
  divider: { width: 1, height: 28, background: border },

  sectionDivider: { height: 1, background: border, margin: "8px 0 32px" },
  section: { paddingBottom: 8 },
  sectionTitle: {
    fontFamily: serif,
    fontSize: 22,
    fontWeight: 400,
    color: textPrimary,
    marginBottom: 20,
    letterSpacing: "0.02em",
  },
  description: { fontSize: 15, color: textSecondary, lineHeight: 1.8 },
  importantInfo: { fontSize: 13, color: textMuted, lineHeight: 1.7 },

  facilitiesGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  facilityPill: {
    fontSize: 12,
    padding: "5px 14px",
    border: `1px solid ${border}`,
    borderRadius: 2,
    color: textSecondary,
    cursor: "pointer",
    letterSpacing: "0.04em",
  },
  showMoreBtn: {
    fontSize: 13,
    color: gold,
    letterSpacing: "0.05em",
    marginTop: 4,
    padding: 0,
  },

  sentimentGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  prosCard: {
    background: "rgba(201,169,110,0.06)",
    border: `1px solid rgba(201,169,110,0.2)`,
    borderRadius: 4,
    padding: "16px 20px",
  },
  consCard: {
    background: surface2,
    border: `1px solid ${border}`,
    borderRadius: 4,
    padding: "16px 20px",
  },
  sentimentHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  prosIcon: { color: gold, fontSize: 14 },
  consIcon: { color: textMuted, fontSize: 14 },
  prosLabel: {
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: gold,
  },
  consLabel: {
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: textMuted,
  },
  sentimentItem: {
    fontSize: 13,
    color: textSecondary,
    lineHeight: 1.6,
    marginBottom: 6,
  },

  roomsList: { display: "flex", flexDirection: "column", gap: 12 },
  roomCard: {
    display: "grid",
    gridTemplateColumns: "120px 1fr auto",
    border: `1px solid ${border}`,
    borderRadius: 4,
    overflow: "hidden",
    background: surface,
  },
  roomPhotoWrap: { width: 120, height: 96, overflow: "hidden", flexShrink: 0 },
  roomPhoto: { width: "100%", height: "100%", objectFit: "cover" },
  roomPhotoPlaceholder: {
    width: "100%",
    height: "100%",
    background: surface2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  roomInfo: {
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  roomName: {
    fontSize: 15,
    fontWeight: 400,
    color: textPrimary,
    marginBottom: 6,
  },
  roomBoard: { fontSize: 12, color: textMuted, letterSpacing: "0.05em" },
  roomPriceCol: {
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 8,
    borderLeft: `1px solid ${border}`,
  },
  roomPrice: { fontFamily: serif, fontSize: 22, fontWeight: 400, color: gold },
  roomPriceNight: { fontSize: 11, color: textMuted, marginTop: -6 },
  bookBtn: {
    fontSize: 12,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "8px 18px",
    background: gold,
    color: bg,
    border: "none",
    borderRadius: 2,
    cursor: "pointer",
    fontWeight: 500,
  },

  stickyCard: {
    position: "sticky",
    top: 24,
    background: surface,
    border: `1px solid ${border}`,
    borderRadius: 4,
    padding: "28px 24px",
  },
  stickyTop: {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
    marginBottom: 20,
    borderBottom: `1px solid ${border}`,
    paddingBottom: 20,
  },
  stickyFrom: { fontSize: 12, color: textMuted, letterSpacing: "0.08em" },
  stickyPrice: {
    fontFamily: serif,
    fontSize: 32,
    fontWeight: 300,
    color: gold,
  },
  stickyNight: { fontSize: 13, color: textMuted },
  datesRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  dateCell: { flex: 1, display: "flex", flexDirection: "column", gap: 4 },
  dateCellLabel: {
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: textMuted,
  },
  dateCellVal: { fontSize: 15, color: textPrimary },
  dateSep: { color: textMuted, fontSize: 16 },
  mainBookBtn: {
    width: "100%",
    padding: 14,
    background: gold,
    color: bg,
    border: "none",
    borderRadius: 2,
    fontSize: 13,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontWeight: 500,
    marginBottom: 20,
  },
  policyRow: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    marginBottom: 10,
  },
  policyDot: { color: gold, fontSize: 7, marginTop: 4, flexShrink: 0 },
  policyText: { fontSize: 12, color: textMuted, lineHeight: 1.5 },
  stickyFooter: {
    marginTop: 20,
    paddingTop: 16,
    borderTop: `1px solid ${border}`,
    textAlign: "center",
  },
  stickyFooterText: { fontSize: 11, color: textMuted, letterSpacing: "0.06em" },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.92)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalInner: {
    background: surface,
    border: `1px solid ${border}`,
    borderRadius: 4,
    width: "100%",
    maxWidth: 860,
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: `1px solid ${border}`,
  },
  modalTitle: {
    fontFamily: serif,
    fontSize: 18,
    fontWeight: 400,
    color: textPrimary,
    fontStyle: "italic",
  },
  closeBtn: {
    background: "rgba(255,255,255,0.08)",
    border: "none",
    color: textSecondary,
    width: 32,
    height: 32,
    borderRadius: "50%",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  modalBigImg: {
    width: "100%",
    height: 460,
    objectFit: "contain",
    display: "block",
    background: "#0a0a0a",
  },
};

export default HotelDetailsPage;
