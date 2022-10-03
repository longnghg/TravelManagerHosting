using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    
    public class Car
    {
        private Guid id;
        private string liscensePlate;
        private int status;
        private int amountSeat;
        private Guid idEmployee;

        public Guid Id { get => id; set => id = value; }
        public string LiscensePlate { get => liscensePlate; set => liscensePlate = value; }
        public int Status { get => status; set => status = value; }
        public int AmountSeat { get => amountSeat; set => amountSeat = value; }
        public Guid IdEmployee { get => idEmployee; set => idEmployee = value; }
    }
}
