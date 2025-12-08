import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import Toast from "../components/Toast";
import DeleteConfirmation from "../components/DeleteConfirmation";
import FormInput from "../components/FormInput";
import RecentActivities from "../components/RecentActivities";
import Modal from "../components/Modal";
import AdminLayout from "../Shared/AdminLayout";
import { usePage, Head, router } from "@inertiajs/react";

const AdminContact = () => {
  const { contacts: initialContacts, activities, counts, flash } = usePage().props;

  const [contacts, setContacts] = useState(initialContacts || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({});
  const [componentData, setComponentData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [perPageCount, setPerPageCount] = useState(10);

  useEffect(() => {
    setContacts(Array.isArray(initialContacts) ? initialContacts : (initialContacts?.data || []));
  }, [initialContacts]);

  useEffect(() => {
    if (flash?.success) setToast({ message: flash.success, type: "success" });
    else if (flash?.error) setToast({ message: flash.error, type: "error" });
  }, [flash]);

  const itemsPerPage = perPageCount === "all" ? contacts?.length || 0 : perPageCount;

  const filtered = (contacts || []).filter((c) => {
    const t = searchTerm.toLowerCase();
    return (
      (c.component || "").toLowerCase().includes(t) ||
      (c.data || "").toLowerCase().includes(t)
    );
  });
  const visible = filtered.slice(0, itemsPerPage || filtered.length);

  const fetchContacts = async (size) => {
    try {
      setLoading(true);
      setPerPageCount(size);
      const url = window.route("admin.contacts.list", {
        per_page: size === "all" ? "all" : String(size),
      });
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || data;
      setContacts(list);
    } catch (e) {
      console.error("Failed to load contacts:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(10);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.component?.trim()) newErrors.component = "Component is required";
    if (!formData.position || formData.position < 1) newErrors.position = "Position must be a positive number";

    // Component-specific validation
    switch (formData.component) {
      case 'HeroSection':
        if (!componentData.title?.trim()) newErrors.title = "Title is required";
        if (!componentData.description?.trim()) newErrors.description = "Description is required";
        if (!componentData.buttonText?.trim()) newErrors.buttonText = "Button text is required";
        if (!componentData.buttonLink?.trim()) newErrors.buttonLink = "Button link is required";
        break;

      case 'Frequently Asked Questions':
        if (!componentData.faqs || !Array.isArray(componentData.faqs) || componentData.faqs.length === 0) {
          newErrors.faqs = "At least one FAQ is required";
        } else {
          componentData.faqs.forEach((faq, index) => {
            if (!faq.question?.trim()) newErrors[`faq_${index}_question`] = `Question ${index + 1} is required`;
            if (!faq.answer?.trim()) newErrors[`faq_${index}_answer`] = `Answer ${index + 1} is required`;
          });
        }
        break;

      case 'Get in Touch':
        if (!componentData.items || !Array.isArray(componentData.items) || componentData.items.length === 0) {
          newErrors.items = "At least one contact item is required";
        }
        break;

      case 'Social Links':
        if (!componentData.socialLinks || !Array.isArray(componentData.socialLinks) || componentData.socialLinks.length === 0) {
          newErrors.socialLinks = "At least one social link is required";
        }
        break;

      case 'MapEmbed':
        if (!componentData.url?.trim()) newErrors.url = "Map URL is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Initialize component data when component type changes
    if (name === 'component') {
      const initialData = getInitialComponentData(value);
      setComponentData(initialData);
    }

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const getInitialComponentData = (component) => {
    switch (component) {
      case 'HeroSection':
        return { title: '', description: '', buttonText: '', buttonLink: '', image: '' };
      case 'Frequently Asked Questions':
        return { faqs: [{ question: '', answer: '' }] };
      case 'Get in Touch':
        return { items: [{ title: '', details: [''], extra: '', hasLink: false, linkText: '', linkHref: '' }] };
      case 'Social Links':
        return { socialLinks: [{ title: '', url: '', extra: '' }] };
      case 'MapEmbed':
        return { url: '' };
      default:
        return { rawJson: '{}' };
    }
  };

  const handleCreate = () => {
    setFormData({ component: "", position: contacts.length + 1 });
    setComponentData({});
    setSelectedContact(null);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (contact) => {
    const baseData = {
      component: contact.component,
      position: contact.position
    };
    const parsedComponentData = parseComponentData(contact.component, contact.data);

    setFormData(baseData);
    setComponentData(parsedComponentData);
    setSelectedContact(contact);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const handleDelete = (contact) => {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({ message: "Please fix the errors in the form", type: "error" });
      return;
    }

    const jsonData = convertToJson(formData.component, componentData);
    const fd = new FormData();
    fd.append("component", formData.component ?? "");
    fd.append("data", jsonData);
    fd.append("position", String(formData.position ?? 1));

    if (selectedContact) {
      fd.append("_method", "put");
      router.post(window.route("admin.contacts.update", selectedContact.id), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to update contact", type: "error" });
          setToast({ message: Object.values(errs)[0], type: 'error' });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedContact(null);
          router.reload({ only: ["contacts", "counts"] });
        },
      });
    } else {
      router.post(window.route("admin.contacts.store"), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to create contact", type: "error" });
          setToast({ message: Object.values(errs)[0], type: 'error' });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedContact(null);
          router.reload({ only: ["contacts", "counts"] });
        },
      });
    }
  };

  const confirmDelete = () => {
    if (!selectedContact) return;
    router.post(
      window.route("admin.contacts.destroy", selectedContact.id),
      { _method: "delete" },
      {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedContact(null);
          router.reload({ only: ["contacts", "counts"] });
        },
      }
    );
  };

  const computedCounts = {
    total: counts?.total ?? contacts.length,
    components: counts?.components ?? contacts.length,
  };

  const renderComponentData = (component, data) => {
    switch (component) {
      case 'HeroSection':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Title</label>
                <p className="text-gray-800 font-medium">{data.title || 'N/A'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Description</label>
                <p className="text-gray-700">{data.description || 'N/A'}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Button Text</label>
                  <p className="text-gray-800">{data.buttonText || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Button Link</label>
                  <p className="text-gray-800 break-all">{data.buttonLink || 'N/A'}</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Image URL</label>
                <p className="text-gray-800 break-all text-sm">{data.image || 'N/A'}</p>
              </div>
            </div>
          </div>
        );

      case 'Frequently Asked Questions':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Questions & Answers</h4>
            {Array.isArray(data) && data.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                <div className="mb-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Question</label>
                  <p className="text-gray-800 font-medium">{faq.question}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Answer</label>
                  <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'Get in Touch':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Contact Information</h4>
            {Array.isArray(data) && data.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                <div className="mb-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Type</label>
                  <p className="text-gray-800 font-medium">{item.title}</p>
                </div>
                <div className="mb-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Details</label>
                  <ul className="text-gray-700 text-sm space-y-1">
                    {Array.isArray(item.details) && item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                {item.extra && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Extra Info</label>
                    <p className="text-gray-600 text-sm">{item.extra}</p>
                  </div>
                )}
                {item.link && (
                  <div className="mt-2">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Link</label>
                    <p className="text-blue-600 text-sm break-all">{JSON.parse(item.link).href}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'Social Links':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Social Media Links</h4>
            {Array.isArray(data) && data.map((social, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                <div className="mb-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Platform</label>
                  <p className="text-gray-800 font-medium">{social.extra || social.title}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">URL</label>
                  <p className="text-blue-600 text-sm break-all">{social.details[0]}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'MapEmbed':
        return (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Map Embed URL</label>
              <p className="text-blue-600 text-sm break-all">{data.url}</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <p className="text-gray-600 text-sm">Raw JSON data:</p>
            <pre className="text-xs font-mono text-gray-800 bg-gray-100 p-2 rounded whitespace-pre-wrap break-words">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        );
    }
  };

  const renderTableData = (component, data) => {
    switch (component) {
      case 'HeroSection':
        return `Title: "${data.title || 'N/A'}" • Button: "${data.buttonText || 'N/A'}"`;

      case 'Frequently Asked Questions':
        const faqCount = Array.isArray(data) ? data.length : 0;
        return `${faqCount} FAQ${faqCount !== 1 ? 's' : ''}`;

      case 'Get in Touch':
        const contactCount = Array.isArray(data) ? data.length : 0;
        return `${contactCount} contact item${contactCount !== 1 ? 's' : ''}`;

      case 'Social Links':
        const socialCount = Array.isArray(data) ? data.length : 0;
        return `${socialCount} social link${socialCount !== 1 ? 's' : ''}`;

      case 'MapEmbed':
        return `Map embed URL configured`;

      default:
        return 'Custom component data';
    }
  };

  const parseComponentData = (component, jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      switch (component) {
        case 'HeroSection':
          return {
            title: data.title || '',
            description: data.description || '',
            buttonText: data.buttonText || '',
            buttonLink: data.buttonLink || '',
            image: data.image || ''
          };

        case 'Frequently Asked Questions':
          return {
            faqs: Array.isArray(data) ? data.map(faq => ({
              question: faq.question || '',
              answer: faq.answer || ''
            })) : [{ question: '', answer: '' }]
          };

        case 'Get in Touch':
          return {
            items: Array.isArray(data) ? data.map(item => ({
              title: item.title || '',
              details: Array.isArray(item.details) ? item.details : [''],
              extra: item.extra || '',
              hasLink: !!item.link,
              linkText: item.link ? JSON.parse(item.link).text || '' : '',
              linkHref: item.link ? JSON.parse(item.link).href || '' : ''
            })) : [{ title: '', details: [''], extra: '', hasLink: false, linkText: '', linkHref: '' }]
          };

        case 'Social Links':
          return {
            socialLinks: Array.isArray(data) ? data.map(social => ({
              title: social.title || '',
              url: social.details ? social.details[0] || '' : '',
              extra: social.extra || ''
            })) : [{ title: '', url: '', extra: '' }]
          };

        case 'MapEmbed':
          return {
            url: data.url || ''
          };

        default:
          return { rawJson: jsonData };
      }
    } catch (e) {
      return { rawJson: jsonData };
    }
  };

  const convertToJson = (component, formData) => {
    switch (component) {
      case 'HeroSection':
        return JSON.stringify({
          title: formData.title,
          description: formData.description,
          buttonText: formData.buttonText,
          buttonLink: formData.buttonLink,
          image: formData.image
        });

      case 'Frequently Asked Questions':
        return JSON.stringify(formData.faqs.filter(faq => faq.question.trim() || faq.answer.trim()));

      case 'Get in Touch':
        return JSON.stringify(formData.items.map(item => {
          const result = {
            title: item.title,
            details: item.details.filter(detail => detail.trim()),
            extra: item.extra
          };
          if (item.hasLink && item.linkText && item.linkHref) {
            result.link = JSON.stringify({
              text: item.linkText,
              href: item.linkHref
            });
          }
          return result;
        }));

      case 'Social Links':
        return JSON.stringify(formData.socialLinks.filter(social => social.title.trim() || social.url.trim()).map(social => ({
          title: social.title,
          details: [social.url],
          extra: social.extra
        })));

      case 'MapEmbed':
        return JSON.stringify({
          url: formData.url
        });

      default:
        return componentData.rawJson || '{}';
    }
  };

  const handleComponentDataChange = (field, value) => {
    setComponentData(prev => ({ ...prev, [field]: value }));
  };

  const handleFaqChange = (index, field, value) => {
    setComponentData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => i === index ? { ...faq, [field]: value } : faq)
    }));
  };

  const addFaq = () => {
    setComponentData(prev => ({
      ...prev,
      faqs: [...(prev.faqs || []), { question: '', answer: '' }]
    }));
  };

  const removeFaq = (index) => {
    setComponentData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const handleContactItemChange = (index, field, value) => {
    setComponentData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => i === index ? { ...item, [field]: value } : item)
    }));
  };

  const handleContactDetailChange = (itemIndex, detailIndex, value) => {
    setComponentData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => i === itemIndex ? {
        ...item,
        details: item.details.map((detail, j) => j === detailIndex ? value : detail)
      } : item)
    }));
  };

  const addContactItem = () => {
    setComponentData(prev => ({
      ...prev,
      items: [...(prev.items || []), { title: '', details: [''], extra: '', hasLink: false, linkText: '', linkHref: '' }]
    }));
  };

  const removeContactItem = (index) => {
    setComponentData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSocialLinkChange = (index, field, value) => {
    setComponentData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map((social, i) => i === index ? { ...social, [field]: value } : social)
    }));
  };

  const addSocialLink = () => {
    setComponentData(prev => ({
      ...prev,
      socialLinks: [...(prev.socialLinks || []), { title: '', url: '', extra: '' }]
    }));
  };

  const removeSocialLink = (index) => {
    setComponentData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const renderComponentForm = () => {
    switch (formData.component) {
      case 'HeroSection':
        return (
          <div className="space-y-4">
            <FormInput
              label="Title"
              name="title"
              value={componentData.title || ""}
              onChange={(e) => handleComponentDataChange('title', e.target.value)}
              error={errors.title}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={componentData.description || ""}
                onChange={(e) => handleComponentDataChange('description', e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Button Text"
                name="buttonText"
                value={componentData.buttonText || ""}
                onChange={(e) => handleComponentDataChange('buttonText', e.target.value)}
                error={errors.buttonText}
                required
              />
              <FormInput
                label="Button Link"
                name="buttonLink"
                value={componentData.buttonLink || ""}
                onChange={(e) => handleComponentDataChange('buttonLink', e.target.value)}
                error={errors.buttonLink}
                required
              />
            </div>
            <FormInput
              label="Image URL"
              name="image"
              value={componentData.image || ""}
              onChange={(e) => handleComponentDataChange('image', e.target.value)}
            />
          </div>
        );

      case 'Frequently Asked Questions':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-800">Questions & Answers</h4>
              <button
                type="button"
                onClick={addFaq}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Add FAQ
              </button>
            </div>
            {errors.faqs && <p className="text-sm text-red-600">{errors.faqs}</p>}
            {componentData.faqs?.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-700">FAQ #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <FormInput
                  label="Question"
                  value={faq.question}
                  onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                  error={errors[`faq_${index}_question`]}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors[`faq_${index}_answer`] ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors[`faq_${index}_answer`] && <p className="mt-1 text-sm text-red-600">{errors[`faq_${index}_answer`]}</p>}
                </div>
              </div>
            ))}
          </div>
        );

      case 'Get in Touch':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-800">Contact Information</h4>
              <button
                type="button"
                onClick={addContactItem}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Add Item
              </button>
            </div>
            {errors.items && <p className="text-sm text-red-600">{errors.items}</p>}
            {componentData.items?.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-700">Contact Item #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeContactItem(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <FormInput
                  label="Title"
                  value={item.title}
                  onChange={(e) => handleContactItemChange(index, 'title', e.target.value)}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                  {item.details?.map((detail, detailIndex) => (
                    <input
                      key={detailIndex}
                      type="text"
                      value={detail}
                      onChange={(e) => handleContactDetailChange(index, detailIndex, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                      placeholder="Enter detail"
                    />
                  ))}
                </div>
                <FormInput
                  label="Extra Info"
                  value={item.extra}
                  onChange={(e) => handleContactItemChange(index, 'extra', e.target.value)}
                />
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.hasLink}
                      onChange={(e) => handleContactItemChange(index, 'hasLink', e.target.checked)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Has link</span>
                  </label>
                  {item.hasLink && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <FormInput
                        label="Link Text"
                        value={item.linkText}
                        onChange={(e) => handleContactItemChange(index, 'linkText', e.target.value)}
                      />
                      <FormInput
                        label="Link URL"
                        value={item.linkHref}
                        onChange={(e) => handleContactItemChange(index, 'linkHref', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 'Social Links':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-800">Social Media Links</h4>
              <button
                type="button"
                onClick={addSocialLink}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Add Link
              </button>
            </div>
            {errors.socialLinks && <p className="text-sm text-red-600">{errors.socialLinks}</p>}
            {componentData.socialLinks?.map((social, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-700">Social Link #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeSocialLink(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <FormInput
                  label="Platform"
                  value={social.title}
                  onChange={(e) => handleSocialLinkChange(index, 'title', e.target.value)}
                  required
                />
                <FormInput
                  label="URL"
                  value={social.url}
                  onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                  required
                />
                <FormInput
                  label="Display Name"
                  value={social.extra}
                  onChange={(e) => handleSocialLinkChange(index, 'extra', e.target.value)}
                />
              </div>
            ))}
          </div>
        );

      case 'MapEmbed':
        return (
          <div className="space-y-4">
            <FormInput
              label="Map Embed URL"
              name="url"
              value={componentData.url || ""}
              onChange={(e) => handleComponentDataChange('url', e.target.value)}
              error={errors.url}
              required
            />
          </div>
        );

      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Raw JSON Data</label>
            <textarea
              name="rawJson"
              value={componentData.rawJson || ""}
              onChange={(e) => handleComponentDataChange('rawJson', e.target.value)}
              rows={10}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm ${errors.data ? 'border-red-500' : 'border-gray-300'}`}
              placeholder='{"key": "value"}'
            />
            {errors.data && <p className="mt-1 text-sm text-red-600">{errors.data}</p>}
          </div>
        );
    }
  };

  return (
    <AdminLayout>
      <Head title="Admin Contacts" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Contact Page Management</h1>
            <p className="text-gray-600 mt-1">Manage contact page components and content</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Component
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Total Components</p>
            <p className="text-3xl font-bold text-gray-800">{computedCounts.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Active Components</p>
            <p className="text-3xl font-bold text-blue-600">{computedCounts.components}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-6 shadow-2xl rounded-xl p-6 min-h-[calc(100vh-16rem)] hover:shadow-none transition-all">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search components..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Add more:</span>
                  {[5, 10, 20].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() =>
                        fetchContacts(
                          (perPageCount === "all" ? contacts.length : perPageCount || 0) + n
                        )
                      }
                      disabled={loading}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => fetchContacts("all")}
                    disabled={loading}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Load all
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {visible.length > 0 ? (
                  visible.map((c) => (
                    <div key={c.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800">{c.component}</h3>
                              <div className="text-sm text-gray-600 break-words">
                                <div>Position: {c.position}</div>
                                <div className="truncate max-w-xs">
                                  {(() => {
                                    try {
                                      const parsedData = JSON.parse(c.data);
                                      return renderTableData(c.component, parsedData);
                                    } catch (e) {
                                      return 'Invalid data format';
                                    }
                                  })()}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                              <button onClick={() => handleView(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleEdit(c)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(c)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">No contacts found</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <RecentActivities activities={activities} subjectType="contact" onViewMore={() => router.visit(window.route('admin.activity.index', { subject: 'contact' }))} />
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedContact ? "Edit Contact Component" : "Add Contact Component"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="Component" name="component" value={formData.component || ""} onChange={handleInputChange} error={errors.component} required />
              <FormInput label="Position" name="position" type="number" value={formData.position || 1} onChange={handleInputChange} error={errors.position} required min="1" />
            </div>
            {formData.component && (
              <div className="border-t pt-4">
                <h4 className="text-lg font-medium text-gray-800 mb-4">{formData.component} Configuration</h4>
                {renderComponentForm()}
              </div>
            )}
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{selectedContact ? "Update" : "Create"}</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Contact Component Details">
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Component</p>
                  <p className="text-gray-800 font-medium break-words">{selectedContact.component}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="text-gray-800 font-medium break-words">{selectedContact.position}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-3">Component Data</p>
                <div className="bg-gray-50 p-4 rounded-lg border max-h-96 overflow-y-auto">
                  {(() => {
                    try {
                      const parsedData = JSON.parse(selectedContact.data);
                      return renderComponentData(selectedContact.component, parsedData);
                    } catch (e) {
                      return (
                        <div className="text-red-600 text-sm">
                          <p className="font-medium">Invalid JSON data:</p>
                          <pre className="text-xs font-mono text-gray-800 mt-2 whitespace-pre-wrap break-words">
                            {selectedContact.data}
                          </pre>
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          )}
        </Modal>

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Contact"
          message={`Are you sure you want to delete the "${selectedContact?.component || "this component"}" component? This action cannot be undone.`}
        />

        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminContact;

