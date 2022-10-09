using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class TourDetail
    {  
        public string IdTourDetail { get; set; }
        public string TourId { get; set; }
        public Guid CostTourId { get; set; }
        public float PriceChild { get; set; }
        public float PriceBaby { get; set; }
        public float PriceAdult { get; set; }
        public float PriceChildPromotion { get; set; }
        public float PriceBabyPromotion { get; set; }
        public float PriceAdultPromotion { get; set; }
        public float DisplayPrice { get; set; }
        public float DisplayPromotionPrice { get; set; }
        public string Description { get; set; }
        public int QuantityBooked { get; set; }
        public bool IsPromotion { get; set; }
        public float TotalCostTour { get; set; }
        public int Profit { get; set; }
        public float Vat { get; set; }
        public float FinalPrice { get; set; }
        public CostTour CostTour { get; set; }
        
    }
}
