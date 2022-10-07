using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Context.Models;

namespace Travel.Shared.ViewModels.Travel
{
    public class ScheduleViewModel
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
        private string nameTour;

        private Guid idCar;
        private string liscensePlate;
        private string nameDriver;

        private Guid idEmployee;
        private string nameEmployee;

        private int idPromotion;

        private ICollection<Promotion> promotions;
        private ICollection<Timeline> timelines;

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
        public string NameTour { get => nameTour; set => nameTour = value; }
        public Guid IdCar { get => idCar; set => idCar = value; }
        public string LiscensePlate { get => liscensePlate; set => liscensePlate = value; }
        public Guid IdEmployee { get => idEmployee; set => idEmployee = value; }
        public string NameEmployee { get => nameEmployee; set => nameEmployee = value; }
        public string NameDriver { get => nameDriver; set => nameDriver = value; }
        public ICollection<Promotion> Promotions { get => promotions; set => promotions = value; }
        public ICollection<Timeline> Timelines { get => timelines; set => timelines = value; }
        public int IdPromotion { get => idPromotion; set => idPromotion = value; }
    }
}
