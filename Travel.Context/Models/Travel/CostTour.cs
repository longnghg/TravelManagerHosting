using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class CostTour
    {
        public Guid IdCostTour { get; set; }
        public string TourDetailId { get; set; }
        public float Breakfast { get; set; }
        public float Water { get; set; }
        public float FeeGas { get; set; }
        public float Distance { get; set; }
        public float SellCost { get; set; }
        public float Depreciation { get; set; }
        public float OtherPrice { get; set; }
        public float Tolls { get; set; }
        public int CusExpected { get; set; }
        public float InsuranceFee { get; set; }
        public bool IsHoliday { get; set; }
        public float TotalCostTour { get; set; }
        public Guid HotelId { get; set; }
        public float PriceHotel { get; set; }
        public Guid RestaurantId { get; set; }
        public float PriceRestaurant { get; set; }
        public Guid PlaceId { get; set; }
        public float PriceTicketPlace { get; set; }
        public TourDetail TourDetails { get; set; }
        public Place Place { get; set; }
        public Hotel Hotel { get; set; }
        public Restaurant Restaurant { get; set; }
    }
}
