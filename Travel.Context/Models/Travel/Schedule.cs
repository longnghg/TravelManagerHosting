using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Schedule
    {

        private string id;
        private long departureDate;
        private long beginDate;
        private long endDate;
        private long timePromotion;

        private int status;

        private float finalPrice;
        private float quantityAdult;
        private float quantityBaby;
        private float minCapacity;
        private float quantityChild;

        private int idTour;
        private int idCar;
        private int idTourGuide;
        private int idPromotion;

        public string Id { get => id; set => id = value; }
        public long DepartureDate { get => departureDate; set => departureDate = value; }
        public long BeginDate { get => beginDate; set => beginDate = value; }
        public long EndDate { get => endDate; set => endDate = value; }
        public long TimePromotion { get => timePromotion; set => timePromotion = value; }
        public int Status { get => status; set => status = value; }
        public float FinalPrice { get => finalPrice; set => finalPrice = value; }
        public float QuantityAdult { get => quantityAdult; set => quantityAdult = value; }
        public float QuantityBaby { get => quantityBaby; set => quantityBaby = value; }
        public float MinCapacity { get => minCapacity; set => minCapacity = value; }
        public float QuantityChild { get => quantityChild; set => quantityChild = value; }
        public int IdTour { get => idTour; set => idTour = value; }
        public int IdCar { get => idCar; set => idCar = value; }
        public int IdTourGuide { get => idTourGuide; set => idTourGuide = value; }
        public int IdPromotion { get => idPromotion; set => idPromotion = value; }
    }
}
