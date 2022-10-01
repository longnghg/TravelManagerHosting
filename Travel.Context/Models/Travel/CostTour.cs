using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.Models
{
    public class CostTour
    {
        private int id;
        private int idTourDetail;
        private decimal breakfast;
        private decimal water;
        private decimal feeGas;
        private decimal distance;
        private decimal sellCost;
        private decimal depreciation;
        private decimal otherPrice;
        private decimal tolls;
        private int cusExpected;
        private decimal insuranceFee;
        private bool isHoliday;
        private decimal totalCostTour;
        private int idHotel;
        private decimal priceHotel;
        private int idRestaurant;
        private decimal priceRestaurant;
        private int idPlace;
        private decimal priceTicketPlace;

        public int Id { get => id; set => id = value; }
        public int IdTourDetail { get => idTourDetail; set => idTourDetail = value; }
        public decimal Breakfast { get => breakfast; set => breakfast = value; }
        public decimal Water { get => water; set => water = value; }
        public decimal FeeGas { get => feeGas; set => feeGas = value; }
        public decimal Distance { get => distance; set => distance = value; }
        public decimal SellCost { get => sellCost; set => sellCost = value; }
        public decimal Depreciation { get => depreciation; set => depreciation = value; }
        public decimal OtherPrice { get => otherPrice; set => otherPrice = value; }
        public decimal Tolls { get => tolls; set => tolls = value; }
        public int CusExpected { get => cusExpected; set => cusExpected = value; }
        public decimal InsuranceFee { get => insuranceFee; set => insuranceFee = value; }
        public bool IsHoliday { get => isHoliday; set => isHoliday = value; }
        public decimal TotalCostTour { get => totalCostTour; set => totalCostTour = value; }
        public int IdHotel { get => idHotel; set => idHotel = value; }
        public decimal PriceHotel { get => priceHotel; set => priceHotel = value; }
        public int IdRestaurant { get => idRestaurant; set => idRestaurant = value; }
        public decimal PriceRestaurant { get => priceRestaurant; set => priceRestaurant = value; }
        public int IdPlace { get => idPlace; set => idPlace = value; }
        public decimal PriceTicketPlace { get => priceTicketPlace; set => priceTicketPlace = value; }
    }
}
