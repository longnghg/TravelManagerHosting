using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Context.Models;

namespace Travel.Shared.ViewModels.Travel
{
    public class CreateScheduleViewModel
    {
        private string id;
        private long departureDate;
        private long beginDate;
        private long endDate;
        private long timePromotion;
        private float finalPrice;
        private float quantityAdult;
        private float quantityBaby;
        private float minCapacity;
        private float quantityChild;
        private int status;

        private string idTour;
        private Guid idCar;
        private Guid idEmployee;

        public string Id { get => id; set => id = value; }
        public long DepartureDate { get => departureDate; set => departureDate = value; }
        public long BeginDate { get => beginDate; set => beginDate = value; }
        public long EndDate { get => endDate; set => endDate = value; }
        public long TimePromotion { get => timePromotion; set => timePromotion = value; }
        public float FinalPrice { get => finalPrice; set => finalPrice = value; }
        public float QuantityAdult { get => quantityAdult; set => quantityAdult = value; }
        public float QuantityBaby { get => quantityBaby; set => quantityBaby = value; }
        public float MinCapacity { get => minCapacity; set => minCapacity = value; }
        public float QuantityChild { get => quantityChild; set => quantityChild = value; }
        public int Status { get => status; set => status = value; }
        public string IdTour { get => idTour; set => idTour = value; }
        public Guid IdCar { get => idCar; set => idCar = value; }
        public Guid IdEmployee { get => idEmployee; set => idEmployee = value; }
      
    }
}
