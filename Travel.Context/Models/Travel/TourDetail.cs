using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Shared.Models
{
    public class TourDetail
    {
        private string id;
        private string tourId;
        private Guid idCostTour;

        private float priceChild;
        private float priceBaby;
        private float priceAdult;
        private float priceChildPromotion;
        private float priceBabyPromotion;
        private float priceAdultPromotion;
        private float displayPrice;
        private float displayPromotionPrice;
        private string description;
        private int quantityBooked;
        private bool isPromotion;
        private float totalCostTour;
        private int profit;
        private float vat;
        private float finalPrice;

        public string Id { get => id; set => id = value; }
        public string TourId { get => tourId; set => tourId = value; }
        public Guid IdCostTour { get => idCostTour; set => idCostTour = value; }
        public float PriceChild { get => priceChild; set => priceChild = value; }
        public float PriceBaby { get => priceBaby; set => priceBaby = value; }
        public float PriceAdult { get => priceAdult; set => priceAdult = value; }
        public float PriceChildPromotion { get => priceChildPromotion; set => priceChildPromotion = value; }
        public float PriceBabyPromotion { get => priceBabyPromotion; set => priceBabyPromotion = value; }
        public float PriceAdultPromotion { get => priceAdultPromotion; set => priceAdultPromotion = value; }
        public float DisplayPrice { get => displayPrice; set => displayPrice = value; }
        public float DisplayPromotionPrice { get => displayPromotionPrice; set => displayPromotionPrice = value; }
        public string Description { get => description; set => description = value; }
        public int QuantityBooked { get => quantityBooked; set => quantityBooked = value; }
        public bool IsPromotion { get => isPromotion; set => isPromotion = value; }
        public float TotalCostTour { get => totalCostTour; set => totalCostTour = value; }
        public int Profit { get => profit; set => profit = value; }
        public float Vat { get => vat; set => vat = value; }
        public float FinalPrice { get => finalPrice; set => finalPrice = value; }
    }
}
