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

        private string idTour;
        private Guid idCar;
        private int idPromotion;
        private string idTimeline;
        private Guid idEmployee;

        private Car cars;
        private ICollection<Promotion> promotions;
        private Tour tour;
        private ICollection<Timeline> timelines;
        private Employee employee;
        
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
        public string IdTour { get => idTour; set => idTour = value; }
        public Guid IdCar { get => idCar; set => idCar = value; }
        public int IdPromotion { get => idPromotion; set => idPromotion = value; }
        public string IdTimeline { get => idTimeline; set => idTimeline = value; }
        public Car Cars { get => cars; set => cars = value; }
        public ICollection<Promotion> Promotions { get => promotions; set => promotions = value; }
        public Tour Tour { get => tour; set => tour = value; }
        public ICollection<Timeline> Timelines { get => timelines; set => timelines = value; }
        public Employee Employee { get => employee; set => employee = value; }
        public Guid IdEmployee { get => idEmployee; set => idEmployee = value; }
    }
}
