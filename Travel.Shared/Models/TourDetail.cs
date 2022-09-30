using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.Models
{
    public class TourDetail
    {
        private int id;
        private int tourId;
        private int idCostTour;

        private decimal priceChild;
        private decimal priceBaby;
        private decimal priceAdult;
        private decimal priceChildPromotion;
        private decimal priceBabyPromotion;
        private decimal priceAdultPromotion;
        private decimal displayPrice;
        private decimal displayPromotionPrice;
        private string description;
        private int quantityBooked;
        private bool isPromotion;
        private decimal totalCostTour;
        private decimal profit;
        private decimal vat;
        private decimal finalPrice;

        public int Id { get => id; set => id = value; }
        public int TourId { get => tourId; set => tourId = value; }
        public int IdCostTour { get => idCostTour; set => idCostTour = value; }
        public decimal PriceChild { get => priceChild; set => priceChild = value; }
        public decimal PriceBaby { get => priceBaby; set => priceBaby = value; }
        public decimal PriceAdult { get => priceAdult; set => priceAdult = value; }
        public decimal PriceChildPromotion { get => priceChildPromotion; set => priceChildPromotion = value; }
        public decimal PriceBabyPromotion { get => priceBabyPromotion; set => priceBabyPromotion = value; }
        public decimal PriceAdultPromotion { get => priceAdultPromotion; set => priceAdultPromotion = value; }
        public decimal DisplayPrice { get => displayPrice; set => displayPrice = value; }
        public decimal DisplayPromotionPrice { get => displayPromotionPrice; set => displayPromotionPrice = value; }
        public string Description { get => description; set => description = value; }
        public int QuantityBooked { get => quantityBooked; set => quantityBooked = value; }
        public bool IsPromotion { get => isPromotion; set => isPromotion = value; }
        public decimal TotalCostTour { get => totalCostTour; set => totalCostTour = value; }
        public decimal Profit { get => profit; set => profit = value; }
        public decimal Vat { get => vat; set => vat = value; }
        public decimal FinalPrice { get => finalPrice; set => finalPrice = value; }
    }
}
