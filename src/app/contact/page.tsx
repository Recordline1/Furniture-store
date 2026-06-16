import { MapPin, Phone, Clock } from 'lucide-react';
import { Container } from "@/shared/Container"; // Твой компонент контейнера

export default function ContactPage() {
    return (
        <section className="py-16 md:py-24">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch With Us</h2>
                    <p className="text-gray-500 max-w-md mx-auto">
                        For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">

                    <div className="space-y-12">
                        <ContactItem
                            icon={<MapPin className="w-6 h-6" />}
                            title="Address"
                            text="236 5th SE Avenue, New York NY10000, United States"
                        />
                        <ContactItem
                            icon={<Phone className="w-6 h-6" />}
                            title="Phone"
                            text="Mobile: +(84) 546-6789"
                            subtext="Hotline: +(84) 456-6789"
                        />
                        <ContactItem
                            icon={<Clock className="w-6 h-6" />}
                            title="Working Time"
                            text="Monday-Friday: 9:00 - 22:00"
                            subtext="Saturday-Sunday: 9:00 - 21:00"
                        />
                    </div>

                    <form className="space-y-6">
                        <InputField label="Your name" placeholder="Abc" />
                        <InputField label="Email address" placeholder="Abc@def.com" />
                        <InputField label="Subject" placeholder="This is an optional" />

                        <div>
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <textarea className="w-full p-4 border rounded-xl" rows={4} placeholder="Hi! i'd like to ask about" />
                        </div>

                        <button className="px-12 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition cursor-pointer">
                            Submit
                        </button>
                    </form>

                </div>
            </Container>
        </section>
    );
};

interface ContactItemProps {
    icon: React.ReactNode;
    title: string;
    text: string;
    subtext?: string;
}

const ContactItem = ({ icon, title, text, subtext }: ContactItemProps) => (
    <div className="flex gap-4">
        <div className="mt-1">{icon}</div>
        <div>
            <h3 className="font-bold text-xl mb-1">{title}</h3>
            <p className="text-gray-900">{text}</p>
            {subtext && <p className="text-gray-900">{subtext}</p>}
        </div>
    </div>
);

interface InputFieldProps {
    label: string;
    placeholder: string;
}

const InputField = ({ label, placeholder }: InputFieldProps) => (
    <div>
        <label className="block text-sm font-medium mb-2">{label}</label>
        <input type="text" className="w-full p-4 border rounded-xl" placeholder={placeholder} />
    </div>
);