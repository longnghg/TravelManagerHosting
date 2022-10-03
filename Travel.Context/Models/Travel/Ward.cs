using System;

namespace Travel.Shared.Models
{
    public class Ward
    {
        private Guid id;
        private string name;
        private Guid idDistrict;


        public Guid Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public Guid IdDistrict { get => idDistrict; set => idDistrict = value; }
    }
}
