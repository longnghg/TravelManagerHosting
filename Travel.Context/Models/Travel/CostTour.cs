using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.Models
{
    public class CostTour
    {
        private Guid id;
        private string idTourDetail;
        private float breakfast;
        private float water;
        private float feeGas;
        private float distance;
        private float sellCost;
        private float depreciation;
        private float otherPrice;
        private float tolls;
        private int cusExpected;
        private float insuranceFee;
        private bool isHoliday;
        private float totalCostTour;
        private Guid idHotel;
        private float priceHotel;
        private Guid idRestaurant;
        private float priceRestaurant;
        private Guid idPlace;
        private float priceTicketPlace;

        public Guid Id { get => id; set => id = value; }
        public string IdTourDetail { get => idTourDetail; set => idTourDetail = value; }
        public float Breakfast { get => breakfast; set => breakfast = value; }
        public float Water { get => water; set => water = value; }
        public float FeeGas { get => feeGas; set => feeGas = value; }
        public float Distance { get => distance; set => distance = value; }
        public float SellCost { get => sellCost; set => sellCost = value; }
        public float Depreciation { get => depreciation; set => depreciation = value; }
        public float OtherPrice { get => otherPrice; set => otherPrice = value; }
        public float Tolls { get => tolls; set => tolls = value; }
        public int CusExpected { get => cusExpected; set => cusExpected = value; }
        public float InsuranceFee { get => insuranceFee; set => insuranceFee = value; }
        public bool IsHoliday { get => isHoliday; set => isHoliday = value; }
        public float TotalCostTour { get => totalCostTour; set => totalCostTour = value; }
        public Guid IdHotel { get => idHotel; set => idHotel = value; }
        public float PriceHotel { get => priceHotel; set => priceHotel = value; }
        public Guid IdRestaurant { get => idRestaurant; set => idRestaurant = value; }
        public float PriceRestaurant { get => priceRestaurant; set => priceRestaurant = value; }
        public Guid IdPlace { get => idPlace; set => idPlace = value; }
        public float PriceTicketPlace { get => priceTicketPlace; set => priceTicketPlace = value; }
    }
}
